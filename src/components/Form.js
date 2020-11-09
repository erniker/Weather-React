import React, { useState } from "react";
import Error from "./Error";
import PropTypes from "prop-types";

const Form = ({ search, setSearch, setConsult }) => {
  // Error state
  const [error, setError] = useState(false);

  // Extract city and country
  const { city, country } = search;

  // Set element on state
  const handleChange = (e) => {
    // Update state
    setSearch({
      ...search,
      [e.target.name]: e.target.value,
    });
  };

  //Submit
  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate
    if (city.trim() === "" || country.trim() === "") {
      setError(true);
      return;
    }
    setError(false);

    // Pass to main component
    setConsult(true);
  };

  return (
    <form onSubmit={handleSubmit}>
      {error ? <Error message="Ambos campos son obligatorios" /> : null}
      <div className="input-field col s12">
        <input
          type="text"
          name="city"
          id="city"
          value={city}
          onChange={handleChange}
        />
        <label htmlFor="city">City:</label>
      </div>

      <div className="input-field col s12">
        <select
          name="country"
          id="country"
          value={country}
          onChange={handleChange}
        >
          <option value="">-- Seleccione un país --</option>
          <option value="US">Estados Unidos</option>
          <option value="MX">México</option>
          <option value="AR">Argentina</option>
          <option value="CO">Colombia</option>
          <option value="CR">Costa Rica</option>
          <option value="ES">España</option>
          <option value="PE">Perú</option>
        </select>
        <label htmlFor="country">Country:</label>
      </div>
      <div className="input-field col s12">
        <button
          type="submit"
          className="waves-effect waves-light btn-large btn-block yellow accent-4 col s12"
        >
          Buscar Clima
        </button>
      </div>
    </form>
  );
};

Form.propTypes = {
  search: PropTypes.object.isRequired,
  setSearch: PropTypes.func.isRequired,
  setConsult: PropTypes.func.isRequired,
};

export default Form;
