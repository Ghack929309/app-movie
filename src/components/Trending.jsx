import React, { useState, useEffect } from "react";
import TrendsDisplay from "./TrendsDisplay";

function Trending() {
	const [trends, setTrends] = useState([]);
	useEffect(() => {
		const trendings = async () => {
			const url = `https://api.themoviedb.org/3/trending/all/day?api_key=${process.env.REACT_APP_API_KEY}`;
			try {
				const res = await fetch(url);
				const data = await res.json();
				setTrends(data.results);
			} catch (err) {
				console.error(err);
			}
		};
		trendings();
	}, []);

	return (
		<div>
			<p>Found ({trends.length}) new trends for today</p>
			{trends
				.filter((trend) => trend.poster_path)
				.map((trend) => (
					<TrendsDisplay key={trend.id} trend={trend} />
				))}
		</div>
	);
}

export default Trending;
