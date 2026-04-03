import { useEffect, useState } from "react";

export default getHoloday() {
    const countries = ["JP", "FR", "NL"];
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
          data.forEach((obj) => holidays[country].push(obj.name[0].text));
        }),
      );
      setHoliday(holidays);
    }
    fetchAllCountries();
  }, []);


  
}