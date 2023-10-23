import { useQuery } from "react-query";
import { useState } from "react";
import CharacterCard from "./CharacterCard";

const Character = () => {
  const [page, setPage] = useState(1); // Start at page 1

  const fetchCharacters = async ({ queryKey }) => {
    const response = await fetch(
      `https://rickandmortyapi.com/api/character?page=${queryKey[1]}`
    );
    const data = await response.json();
    return data.results;
  };

  const { data, isPreviousData, isLoading, isError } = useQuery(
    ["characters", page],
    fetchCharacters,
    {
      keepPreviousData: true,
    }
  );

  if (isLoading) {
    return <div>Loading....</div>;
  }

  if (isError) {
    return <div>An Error Occurred!!</div>;
  }

  const isLastPage = data.length < 20; // Assuming 20 items per page

  return (
    <div className="characters">
      {data.map((character) => {
        return <CharacterCard key={character.id} character={character} />;
      })}
      <div>
        <button
          disabled={page === 1}
          onClick={() => setPage((prev) => prev - 1)}
        >
          Previous
        </button>

        <button
          disabled={isPreviousData || isLastPage}
          onClick={() => setPage((prev) => prev + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Character;
