import { useState } from "react";

function AddStock({ addStock }) {
	// état du symbole de l'action
	const [symbol, setSymbol] = useState("");

	// fonction de submit du formulaire
	const handleSubmit = (e) => {
		e.preventDefault();
		if (symbol) {
			addStock({ symbol, price: 0, gainloss: 0 });
			setSymbol("");
		}
	};

	return (
		<>
			<h2>Ajouter une nouvelle action</h2>
			<form onSubmit={handleSubmit}>
				<input
					type="text"
					placeholder="Ajouter un symbole d'action"
					value={symbol}
					onChange={(e) => setSymbol(e.target.value)}
				/>
				<button type="submit">Ajouter</button>
			</form>
		</>
	);
}

export default AddStock;
