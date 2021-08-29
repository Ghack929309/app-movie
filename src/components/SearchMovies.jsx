import React, { useState, useEffect } from "react";
import SearchCards from "./SearchCards";
import Trending from "./Trending";

function SearchMovies() {
	const [toggle, setToggle] = useState(false);
	const [query, setQuery] = useState("");
	const [movies, setMovies] = useState([]);

	const searchMovie = (e) => {
		const removeExtraSpace = (s) => s.trim().split(/ +/).join(" ");
		const value = e.target.value;
		setQuery(removeExtraSpace(value));
	};

	useEffect(() => {
		if (!query) {
			return;
		}

		const url = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&query=${query}&page=1&include_adult=true`;
		const fetchData = async () => {
			try {
				const res = await fetch(url);
				const data = await res.json();
				setMovies(data.results);
			} catch (err) {
				console.error(err);
			}
			setToggle({ toggle: true });
		};
		fetchData();
	}, [query]);
	const handleSearch = async (e) => {
		e.preventDefault();
	};

	return (
		<>
			<form className="form" onSubmit={handleSearch}>
				<label className="label" htmlFor="query">
					Movie Name
				</label>
				<input
					type="text"
					className="input"
					name="query"
					placeholder="Search"
					value={query}
					onChange={searchMovie}
				/>
				<button type="submit" className="button">
					Search
				</button>
			</form>
			<br />
			<div style={{ display: !toggle || !query ? "block" : "none" }}>
				<p>
					<strong>All Today's trend Movies/TV/Series/Person</strong>
				</p>

				<Trending />
			</div>
			<div className="card-list" style={{ display: toggle ? "block" : "none" }}>
				<p>
					Found: ({movies.length}) results for "<strong>{query}</strong>"
				</p>
				{/* filter the search results */}
				{movies
					.filter((movie) =>
						movie
							? movie.original_title.toLowerCase().includes(query.toLowerCase())
							: null
					)
					.map((movie) => (
						<SearchCards movie={movie} key={movie.id} />
					))}
			</div>
		</>
	);
}

export default SearchMovies;
