import React, { useState, useEffect } from "react";
import AreaGraph from "../Graphs/AreaGraph";
import { ErrorDataItem, Data, investmentsCategories, transformInvestmentsData } from "../../dataUtilities";
import styles from "./index.module.scss";

interface Props {
  endpoint: string;
  name?: string;
  schema: string;
  description: string;
}

const Container = (props: Props) => {
  const [transformedData, setTransformedData] = useState<Data>([]);
  const [error, setError] = useState<ErrorDataItem | null>(null);
  const [currentBalance, setCurrentBalance] = useState<any>();
  const [futureBalance, setFutureBalance] = useState<any>();
  const [accountName, setAccountName] = useState<string>('');
  const [duration, setDuration] = useState<any>(5);
  const [contributions, setContributions] = useState<any>(6000);
  const [rate, setRate] = useState<any>(6);

  const getData = async () => {
    const response = await fetch(`/api/${props.endpoint}`, { method: "GET" });
    const data = await response.json();
    if (data.error != null) {
      setError(data.error);
      return;
    }
    getCurrentBalance(data.holdings.accounts);
    setTransformedData(transformInvestmentsData(data));
  };

  const getCurrentBalance = (accounts: Array<any>) => {
    for (var account of accounts) {
      if (account.subtype == "ira") {
        setCurrentBalance(account.balances.current);
        setAccountName(account.name);
        setFutureBalance(account.balances.current);
      }
    }
  }

  useEffect(() => {
    getData();
    return () => {};
  }, [])

  return (
    <div>
      <div className={styles.result}>
        <div className={styles.futureBalance}>${futureBalance}</div>
        <div className={styles.description}>Balance of <u className={styles.underline}>{accountName}</u> after {duration} years</div>
      </div>
      <AreaGraph 
        data={[{x: "2022", y: 100}, {x: "2023", y: 150}, {x: "2024", y: 200}, {x: "2025", y: 250}, {x: "2026", y: 300}]}
      />
      <form className={styles.form}>
        <label className={styles.label}>
          Current Balance
          <input className={styles.input} value={currentBalance} onChange={(e) => {setCurrentBalance(e.target.value)}}/>
        </label>
        <label className={styles.label}>
          Annual Contributions
          <input className={styles.input} value={contributions} onChange={(e) => {setContributions(e.target.value)}}/>
        </label>
        <label className={styles.label}>
          Rate of Return
          <input className={styles.input} value={rate} onChange={(e) => {setRate(e.target.value)}}/>
        </label>
        <label className={styles.label}>
          Years of Growth
          <input className={styles.input} value={duration} onChange={(e) => {setDuration(e.target.value)}}/>
        </label>
      </form>
    </div>
  );
};

export default Container;