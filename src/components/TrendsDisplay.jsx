import React from "react";

function trendsDisplay({ trend }) {
	return (
		<div className="card">
			<img
				className="card--image"
				src={`https://image.tmdb.org/t/p/w185_and_h278_bestv2/${trend.poster_path}`}
				alt={trend.title + " poster"}
			/>
			<div className="card--content">
				<h3 className="card--title">{trend.title}</h3>
				<p>
					<small>RELEASE DATE: {trend.release_date}</small>
				</p>
				<p>
					<small> RATING: {trend.vote_average}</small>
				</p>
				<p className="card--desc">{trend.overview}</p>
			</div>
		</div>
	);
}

export default trendsDisplay;
