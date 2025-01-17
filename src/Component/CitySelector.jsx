import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "./CitySelector.module.css";

function CitySelector() {
  const [contries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [selectedContry, setSelectedContry] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [selectedCity, setSelectedCity] = useState("");

  useEffect(() => {
    axios
      .get("https://crio-location-selector.onrender.com/countries")
      .then((response) => {
        setCountries(response.data);
      })
      .catch((error) => {
        console.error("Error fetching countries:", error);
      });
  }, []);

  // useEffect(() => {
  //     fetch('https://crio-location-selector.onrender.com/countries')
  //     .then(response => response.json())
  //     .then(countries => setCountries(countries))
  //     .catch(error => console.error("Error fetching data: ", error))
  // }, []);

  useEffect(() => {
    if (selectedContry) {
      axios
        .get(
          `https://crio-location-selector.onrender.com/country=${selectedContry}/states`
        )
        .then((response) => {
          setStates(response.data);
          setSelectedState("");
          setCities([]);
          setSelectedCity("");
        })
        .catch((error) => {
          console.error("Error fetching states:", error);
        });
    }
  }, [selectedContry]);

  useEffect(() => {
    if (selectedContry && selectedState) {
      axios
        .get(
          `https://crio-location-selector.onrender.com/country=${selectedContry}/state=${selectedState}/cities`
        )
        .then((response) => {
          setCities(response.data);
          setSelectedCity("");
        })
        .catch((error) => {
          console.error("Error fetching cities:", error);
        });
    }
  }, [selectedContry, selectedState]);

  return (
    <>
      <div className={styles["city-selector"]}>
        <h1>Select Location</h1>
        <div className={styles.dropdowns}>
          <select
            value={selectedContry}
            onChange={(e) => setSelectedContry(e.target.value)}
            className={styles.dropdown}
          >
            <option value="" disabled>
              Select Country
            </option>
            {contries.map((country) => (
              <option key={country} value={country}>
                {country}
              </option>
            ))}
          </select>

          <select
            value={selectedState}
            onChange={(e) => setSelectedState(e.target.value)}
            disabled={!selectedContry}
            className={styles.dropdown}
          >
            <option value="" disabled>
              Select State
            </option>
            {states.map((state) => (
              <option key={state} value={state}>
                {state}
              </option>
            ))}
          </select>

          <select
            value={selectedCity}
            onChange={(e) => setSelectedCity(e.target.value)}
            disabled={!selectedState}
            className={styles.dropdown}
          >
            <option value="" disabled>
              Select City
            </option>
            {cities.map((city) => (
              <option key={city} value={city}>
                {city}
              </option>
            ))}
          </select>
        </div>

        {selectedCity && (
          <h2 className={styles.result}>
            You selected{" "}
            <span className={styles.highlight}>{selectedCity}</span>,
            <span className={styles.fade}>
              {" "}
              {selectedState}, {selectedContry}
            </span>
          </h2>
        )}
      </div>
    </>
  );
}

export default CitySelector;
