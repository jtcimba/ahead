import { useState, useEffect } from "react";
import AreaGraph from "./Graphs/AreaGraph";
import styles from "./index.module.scss";
import Header from "./Header";

const Dashboard = () => {
  const [currentBalance, setCurrentBalance] = useState<any>(0);
  const [futureBalance, setFutureBalance] = useState<any>();
  const [accountName, setAccountName] = useState<string>('');
  const [duration, setDuration] = useState<any>(5);
  const [contributions, setContributions] = useState<any>(6000);
  const [rate, setRate] = useState<any>(0.06);
  const [graphData, setGraphData] = useState<any>([]);

  useEffect(() => {
    fetch('/api/holdings', { method: "GET" })
      .then(response => response.json())
      .then(result => { 
        return result.holdings.accounts.find((element: { subtype: string; }) => element.subtype == "ira")
      })
      .then(account => {
        console.log(account);
        setCurrentBalance(account.balances.current);
        setAccountName(account.name);
      });
  }, [])

  useEffect(() => {
    let futureAmount = currentBalance * (Math.pow((1+rate), duration)) + contributions * ((Math.pow((1+rate), duration)-1)/rate);
    const thisYear = new Date().getFullYear();
    let dataSet = [{x: thisYear.toString(), y: currentBalance}];
    let i = 1;
    while (i <= duration) {
      let total = currentBalance * (Math.pow((1+rate), i)) + contributions * ((Math.pow((1+rate), i)-1)/rate);
      dataSet.push({x: (thisYear+i).toString(), y: parseFloat(total.toFixed(2))});
      i++;
    }
    setGraphData(dataSet);
    setFutureBalance((futureAmount).toFixed(2));
  }, [duration, contributions, rate, currentBalance])

  return (
    <div>
      <Header/>
      <div className={styles.container}>
        <div>
          <div>Accounts</div>
        </div>
        <AreaGraph 
          data={graphData}
        />
        <div>
          <div className={styles.result}>
            <div className={styles.futureBalance}>${futureBalance}</div>
            <div className={styles.description}>Balance after {duration} years</div>
          </div>
          <form className={styles.form}>
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
      </div>
    </div>
  );
};

export default Dashboard;