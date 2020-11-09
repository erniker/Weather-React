import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import Form from "./components/Form";
import Weather from "./components/Weather";
import Error from "./components/Error";

function App() {
  const [search, setSearch] = useState({
    city: "",
    country: "",
  });

  const [consult, setConsult] = useState(false);
  const [result, setResult] = useState({});
  const [error, setError] = useState(false);

  // Extract city and country
  const { city, country } = search;

  useEffect(() => {
    const consultarAPI = async () => {
      if (consult) {
        const appId = "23746b021369969bc7d97253f6a58ba6";
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${appId}`;

        const response = await fetch(url);
        const result = await response.json();

        setResult(result);
        setConsult(false);

        // Detect if result is ok or not
        if (result.cod === "404") setError(true);
        else setError(false);
      }
    };
    consultarAPI();
  }, [consult]);

  let component;

  if (error) component = <Error message="No hay resultados" />;
  else component = <Weather result={result} />;

  return (
    <>
      <Header title="Clima Readct App" />

      <div className="contenedor-form">
        <div className="container">
          <div className="row">
            <div className="col m6 s12">
              <Form
                search={search}
                setSearch={setSearch}
                setConsult={setConsult}
              />
            </div>
            <div className="col m6 s12"> {component}</div>
          </div>
        </div>
      </div>
    </>
  );
}
export default App;
