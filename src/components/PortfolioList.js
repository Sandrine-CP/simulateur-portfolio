import { useState, useEffect } from "react";

function PortfolioList({ portfolio, filter, setFilter }) {
	// const filteredPortfolio = portfolio.filter((stock) => {
	// 	if (filter === "gains") return stock.gainloss > 0;
	// 	if (filter === "losses") return stock.gainloss < 0;
	// 	return true;
	// });
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

						// Vérifie que les données existent
						const timeSeries = data["Time Series (5min)"];
						if (timeSeries) {
							const latestTime = Object.keys(timeSeries)[0];
							const latestPrice = Number.parseFloat(
								timeSeries[latestTime]["4. close"],
							);

							// Retourne l'objet de l'action avec le prix mis à jour
							return {
								...stock,
								price: latestPrice,
								gainLoss: (latestPrice - stock.price).toFixed(2),
							};
						}
						console.warn(`Pas de données disponibles pour ${stock.symbol}`);
						return stock; // Garde les données initiales si l'API ne renvoie rien
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

	return (
		<div>
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
			<ul>
				{updatedPortfolio.map((stock) => (
					<li key={stock.symbol}>
						{stock.symbol} - Prix: {stock.price} - Gain/Pertes: {stock.gainloss}
					</li>
				))}
			</ul>
		</div>
	);
}

export default PortfolioList;
