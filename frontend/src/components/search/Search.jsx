import "./Search.css";

const Search = ({ value, onChange }) => {
  return (
    <div className="search-box-container">
      <input
        name="search"
        type="text"
        placeholder="Search products..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
};

export default Search;
