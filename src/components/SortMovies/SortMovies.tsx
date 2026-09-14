import './SortMovies.css';

type Props = {
  sortBy: string;
  onSortChange: (value: string) => void;
}

export const SortMovies = ({
  sortBy,
  onSortChange,
}: Props) => {
  return (
    <div className="sort-movies">
      <label htmlFor="sort">Sort by:</label>

      <select
        id="sort"
        value={sortBy}
        onChange={(event) => onSortChange(event.target.value)}
      >
        <option value="default">Default</option>
        <option value="rating-desc">Rating: High to Low</option>
        <option value="rating-asc">Rating: Low to High</option>
        <option value="newest">Newest First</option>
        <option value="oldest">Oldest First</option>
        <option value="title">Title: A-Z</option>
      </select>
    </div>
  );
};