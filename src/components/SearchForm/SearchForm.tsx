import { useState } from "react";

type Props = { onSearch: (query: string) => void; };

export const SearchForm = ({ onSearch }: Props ) => {
  const [query, setQuery] = useState('');

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSearch(query);

    console.log(query);
  }
    
  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        placeholder="Search movie..."
      />

      <button type="submit">
        Search
      </button>
    </form>
  );
};

