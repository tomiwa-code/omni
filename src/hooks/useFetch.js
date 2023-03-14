import { useEffect, useState } from "react";
import { makeRequest } from "../makeRequest";

const useFetch = (url) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const res = await makeRequest.get(url);
        setData(res.data.data)
      } catch (err) {
        setError(err);
      }
      setIsLoading(false);
    };
    fetchData();
  }, [url]);

  return { isLoading, error, data };
};

export default useFetch;
