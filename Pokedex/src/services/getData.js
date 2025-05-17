import axios from "axios";

const getData = async (url) => {
  try {
    const response = await axios.get(url);
    const data = response.data;
    return data;
  } catch (err) {
    console.error("Error fetching data:", err);
    return {
      error: err?.message || "Unknown error occurred",
    };
  }
};

export default getData;
