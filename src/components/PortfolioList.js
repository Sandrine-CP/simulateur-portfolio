function PortfolioList({ portfolio, filter, setFilter }) {
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
		</div>
	);
}

export default PortfolioList;
