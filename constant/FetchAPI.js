import { useState, useEffect } from "react";

const FetchAPI = (type, lat, lng) => {
  const [data, setData] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const API_KEY = "iH9pB0bmpwepXVcXaGC6uNRKvhl8emRg";

  if (type === "Restaurant") {
    var CategoriesSet = "7315";
  } else if (type === "Cafe") {
    var CategoriesSet = "9376";
  } else if (type === "Bar") {
    var CategoriesSet = "9379";
  } else {
    var CategoriesSet = "9361018";
  }

  const API_REQUEST_URL = `https://api.tomtom.com/search/2/nearbySearch/.json?lat=${lat}&lon=${lng}
                              &limit=50&radius=10000&categorySet=${CategoriesSet}&view=Unified&key=${API_KEY}`;

  useEffect(() => {
    fetch(API_REQUEST_URL)
      .then((response) => response.json())
      .then((json) => setData(json))
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  }, []);
  return { data, isLoading };
};

export default FetchAPI;
