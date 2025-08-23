const Filter = ({ filterName, setFilterName }) => {
  const handleChange = (event) => {
    setFilterName(event.target.value);
  };

  return (
    <div>
      filter shown with
      <input value={filterName} onChange={handleChange} />
    </div>
  );
};

export default Filter;
