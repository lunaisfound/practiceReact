import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const countries = ["AL", "FR", "NL"];
  const [holiday, setHoliday] = useState({});

  useEffect(() => {
    async function fetchAllCountries() {
      const holidays = {};
      await Promise.all(
        countries.map(async (country) => {
          const res = await fetch(
            `https://openholidaysapi.org/PublicHolidays?countryIsoCode=${country}&validFrom=2023-01-01&validTo=2023-12-31`,
          );
          holidays[country] = [];
          const data = await res.json();
          data.map((obj) => holidays[country].push(obj.name[0].text));
        }),
      );
      setHoliday(holidays);
    }
    fetchAllCountries();
  }, []);

  const [selectedCountry, setSelectedCountry] = useState("NL");

  return (
    <>
      {Object.keys(holiday).length > 0 && (
        <select
          value={selectedCountry}
          onChange={(e) => setSelectedCountry(e.target.value)}
        >
          {Object.keys(holiday).map((country) => (
            <option key={country} value={country}>
              {country}
            </option>
          ))}
        </select>
      )}
      <div>
        {holiday[selectedCountry]?.map((name, idx) => (
          <p key={idx}>{name}</p>
        ))}
      </div>
    </>
  );
}

export default App;
