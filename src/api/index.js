import axios from "axios";
import env from "react-dotenv";

export const fetchData = async (country) => {
  let changeURL = env.API_URL;
  if (country) {
    changeURL = `${env.API_URL}/countries/${country}`;
  }
  try {
    const {
      data: { confirmed, recovered, deaths, lastUpdate },
    } = await axios.get(changeURL);
    /* console.log(response); */
    return {
      confirmed,
      recovered,
      deaths,
      lastUpdate,
    };
  } catch (error) {
    console.log(error);
  }
};

export const fetchDailydata = async () => {
  try {
    const { data } = await axios.get(`${env.API_URL}/daily`);
    const modifiedData = data.map((dailyData) => ({
      confirmed: dailyData.confirmed.total,
      deaths: dailyData.deaths.total,
      date: dailyData.reportDate,
    }));

    return modifiedData;
  } catch (error) {
    console.log(error);
  }
};

export const fetchCountries = async () => {
  try {
    const {
      data: { countries },
    } = await axios.get(`${env.API_URL}/countries`);

    return countries.map((country) => country.name);
  } catch (error) {
    console.log(error);
  }
};
