import { useState, useEffect } from "react";

const useAsyncFunction = (asyncFunction) => {
  const [data, setData] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    const init = async () => {
      try {
        const result = await asyncFunction();
        setData(result);
      } catch (e) {
        setErrorMessage(e);
      } finally {
        setLoading(false);
      }
    };
    init();
  }, []);

  return { data, isLoading, errorMessage };
};

export default useAsyncFunction;
