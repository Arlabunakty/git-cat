import React, { useState, useEffect } from "react";

const DataTableSource = ({
  dataSourceFunction,
  dataTransformFunction,
  children,
}) => {
  const [data, setData] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    const init = async () => {
      try {
        const result = await dataSourceFunction();
        setLoading(false);
        setData(result);
      } catch (e) {
        setErrorMessage(e);
        setLoading(false);
      }
    };
    init();
  }, []);

  if (isLoading) {
    return <p>Fetching...</p>;
  }
  if (errorMessage != null) {
    return <p>{errorMessage}</p>;
  }
  dataTransformFunction(data);
  return React.cloneElement(children, {
    data: data,
  });
};

export default DataTableSource;
