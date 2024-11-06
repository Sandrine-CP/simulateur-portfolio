import React, { useState, useEffect } from "react";
import "./styles/PortfolioList.css";

function PortfolioList({ portfolio, filter, setFilter, removeStock }) {
	const [updatedPortfolio, setUpdatedPortfolio] = useState([]);

	useEffect(() => {
		const fetchPrices = async () => {
			const updatedStocks = await Promise.all(
				portfolio.map(async (stock) => {
					try {
						const response = await fetch(
							`https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${stock.symbol}&interval=5min&apikey=${process.env.REACT_APP_ALPHA_VANTAGE_API_KEY}`,
						);
						const data = await response.json();
						console.log("Données récupérées pour", stock.symbol, ":", data);

						const timeSeries = data["Time Series (5min)"];
						if (timeSeries) {
							const latestTime = Object.keys(timeSeries)[0];
							const latestPrice = Number.parseFloat(
								timeSeries[latestTime]["4. close"],
							);

							const gainLoss = stock.price
								? (latestPrice - stock.price).toFixed(2)
								: 0;

							return {
								...stock,
								price: latestPrice,
								gainLoss: gainLoss,
							};
						}
						console.warn(`Pas de données disponibles pour ${stock.symbol}`);
						return stock;
					} catch (error) {
						console.error("Erreur lors de la récupération des prix :", error);
						return stock;
					}
				}),
			);
			setUpdatedPortfolio(updatedStocks);
		};

		fetchPrices();
	}, [portfolio]);

	const filteredPortfolio = updatedPortfolio.filter((stock) => {
		if (filter === "gains") return stock.gainLoss > 0;
		if (filter === "losses") return stock.gainLoss < 0;
		return true;
	});

	return (
		<div className="PortfolioList">
			<div className="Filter">
				<label htmlFor="filter-select">Filtrer par :</label>
				<select
					id="filter-select"
					value={filter}
					onChange={(e) => setFilter(e.target.value)}
				>
					<option value="all">Toutes</option>
					<option value="gains">Gains</option>
					<option value="losses">Pertes</option>
				</select>
			</div>
			<ul className="List">
				{filteredPortfolio.map((stock) => (
					<li key={stock.symbol}>
						{stock.symbol} - Prix: {stock.price} - Gain/Pertes: {stock.gainLoss}
						<button
							className="Button"
							type="button"
							onClick={() => removeStock(stock.symbol)}
						>
							Supprimer
						</button>
					</li>
				))}
			</ul>
		</div>
	);
}

export default PortfolioList;
