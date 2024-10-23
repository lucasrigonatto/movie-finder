import React, { useState } from "react";

function MovieFinder() {
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null); // Novo estado

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const apiKey = "f476df7b";
    const apiUrl = `https://www.omdbapi.com/?s=${searchTerm}&apikey=${apiKey}`;

    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        if (data.Response === "True") {
          setResults(data.Search);
        } else {
          setResults([]);
        }
      })
      .catch((error) => console.error("Erro ao buscar dados:", error));
  };

  const handleMovieSelect = (movie) => {
    setSelectedMovie(movie); // Atualiza o estado do filme selecionado
  };

  return (
    <div className="container">
      <h1>Movie Finder</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={searchTerm}
          onChange={handleChange}
          placeholder="Digite o nome do filme"
        />
        <button type="submit">Buscar</button>
      </form>

      <div className="results">
        {results.length > 0 ? (
          <ul>
            {results.map((movie) => (
              <Movie
                key={movie.imdbID}
                movie={movie}
                onSelect={handleMovieSelect}
              />
            ))}
          </ul>
        ) : (
          <p>Nenhum resultado encontrado</p>
        )}
      </div>

      {/* Renderiza detalhes do filme selecionado */}
      {selectedMovie && (
        <div className="movie-details">
          <h2>{selectedMovie.Title}</h2>
          <p>Ano: {selectedMovie.Year}</p>
          <img
            src={selectedMovie.Poster}
            alt={`${selectedMovie.Title} poster`}
          />
          {/* Adicione mais detalhes conforme necessário */}
        </div>
      )}
    </div>
  );
}

const Movie = (props) => {
  const { Title, Year, imdbID, Type, Poster, onSelect } = props.movie;

  return (
    <div className="row" onClick={() => onSelect(props.movie)}>
      {" "}
      {/* Chama a função ao clicar */}
      <div className="col-4 col-md-3 mb-3">
        <a href={`https://www.imdb.com/title/${imdbID}/`} target="_blank">
          <img src={Poster} className="img-fluid" alt={`${Title} poster`} />
        </a>
      </div>
      <div className="col-8 col-md-9 mb-3">
        <a href={`https://www.imdb.com/title/${imdbID}/`} target="_blank">
          <h4>{Title}</h4>
          <p>
            {Type} | {Year}
          </p>
        </a>
      </div>
    </div>
  );
};

export default MovieFinder;
