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

	return (
		<div className="App">
			<header className="App-header">
				<h1>Simulateur de portfolio boursier</h1>
				<AddStock addStock={addStock} />
				<PortfolioList
					portfolio={portfolio}
					filter={filter}
					setFilter={setFilter}
				/>
			</header>
		</div>
	);
}

export default App;
