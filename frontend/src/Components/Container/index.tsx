import React, { useState, useEffect } from "react";
import AreaGraph from "../Graphs/AreaGraph";
import Table from "../Table";
import { ErrorDataItem, Data, investmentsCategories, transformInvestmentsData } from "../../dataUtilities";

interface Props {
  endpoint: string;
  name?: string;
  schema: string;
  description: string;
}

const Container = (props: Props) => {
  const [transformedData, setTransformedData] = useState<Data>([]);
  const [error, setError] = useState<ErrorDataItem | null>(null);

  const getData = async () => {
    const response = await fetch(`/api/${props.endpoint}`, { method: "GET" });
    const data = await response.json();
    if (data.error != null) {
      setError(data.error);
      return;
    }
    setTransformedData(transformInvestmentsData(data));
  };

  useEffect(() => {
    getData();
    return () => {};
  }, [])
  
  return (
    <div>
      <AreaGraph />
      <Table 
        categories={investmentsCategories}
        data={transformedData}
      />
    </div>
  );
};

export default Container;