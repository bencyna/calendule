import React from "react";
import { Link } from "react-router-dom";
import { useStoreContext } from "../../utils/GlobalState";

function SearchForm() {
  const [state, dispatch] = useStoreContext();

  const handleInputChange = (event) => {
    dispatch({
      type: "searchInvoked",
      search: event.target.value,
    });
  };

  return (
    <form className="d-flex">
      <input
        className="form-control me-sm-2"
        type="text"
        placeholder="Search for a person"
        onChange={handleInputChange}
      />
      <Link to="/find">
        <button className="btn btn-secondary my-2 my-sm-0" type="submit">
          Search
        </button>
      </Link>
    </form>
  );
}

export default SearchForm;
