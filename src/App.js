import { useState } from "react";
import AddStock from "./components/Addstock";
import PortfolioList from "./components/PortfolioList";
import "./App.css";

function App() {
	// état pour ajout des actions au portefeuille
	const [portfolio, setPortfolio] = useState([]);
	// état pour filtrer les actions affichées
	const [filter, setFilter] = useState("all");

	// fonction d'ajout d'action
	const addStock = (newStock) => {
		setPortfolio([...portfolio, newStock]);
	};

	const removeStock = (symbol) => {
		setPortfolio(portfolio.filter((stock) => stock.symbol));
	};

	return (
		<div className="App">
			<header className="App-header">
				<h1 className="Title">Simulateur de portfolio boursier</h1>
			</header>
			<AddStock addStock={addStock} />
			<PortfolioList
				portfolio={portfolio}
				filter={filter}
				setFilter={setFilter}
				removeStock={removeStock}
			/>
			<footer className="Footer">
				<p>Made with 💖 by Sandrine-CP</p>
			</footer>
		</div>
	);
}

export default App;
