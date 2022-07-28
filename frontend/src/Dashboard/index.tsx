import { useState, useEffect } from "react";
import AreaGraph from "./Graphs/AreaGraph";
import styles from "./index.module.scss";
import Header from "./Header";
import TextField from '@mui/material/TextField';
import NumberFormat from 'react-number-format';
import FormControl from '@mui/material/FormControl';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';

const Dashboard = () => {
  const [accounts, setAccounts] = useState<any>([]);
  const [selectedAccount, setSelectedAccount] = useState<any>({});
  const [futureBalance, setFutureBalance] = useState<any>();
  const [duration, setDuration] = useState<any>(5);
  const [contributions, setContributions] = useState<any>(6000);
  const [rate, setRate] = useState<any>(6.0);
  const [graphData, setGraphData] = useState<any>([]);

  useEffect(() => {
    fetch('/api/holdings', { method: "GET" })
      .then(response => response.json())
      .then(result => { 
        return result.holdings.accounts.filter((element: { type: string; }) => element.type === "depository" || element.type ==="investment")
      })
      .then(allAccounts => {
        setAccounts(allAccounts);
        setSelectedAccount(allAccounts[0]);
      });
  }, [])

  useEffect(() => {
    if (selectedAccount.balances?.current) {
      let futureAmount = selectedAccount.balances.current * (Math.pow((1+(rate*0.01)), duration)) +
                         contributions * ((rate === 0) ? duration :
                         ((Math.pow((1+(rate*0.01)), duration)-1)/(rate*0.01)) * (1+rate*0.01));
      const thisYear = new Date().getFullYear();
      let dataSet = [{x: thisYear.toString(), y: selectedAccount.balances.current}];
      for (let i = 1; i <= duration; i++) {
        let total = selectedAccount.balances.current * (Math.pow((1+(rate*0.01)), i)) + 
                    contributions * ((rate === 0) ? i : 
                    ((Math.pow((1+(rate*0.01)), i)-1)/(rate*0.01)));
        dataSet.push({x: (thisYear+i).toString(), y: total});
      }
      setGraphData(dataSet);
      setFutureBalance((futureAmount).toFixed(2));
    }
  }, [duration, contributions, rate, selectedAccount])

  const handleBlur = (value: string, id: string) => {
    if (value === '') {
      switch(id) {
        case 'annual_contributions':
          setContributions(0);
          break;
        case 'rate_of_return':
          setRate(0);
          break;
        case 'duration':
          setDuration(1);
          break;
        default:
         break;
      }
    }
  };

  const handleAccountClick = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    account: any,
  ) => {
    setSelectedAccount(account);
  };

  return (
    <div>
      <Header/>
      <div className={styles.container}>
        <div>
          <div className={styles.description}>Accounts</div>
          <List>{accounts?.map((account: any, i: number) => {
            return (
            <ListItem key={i}>
              <ListItemButton
                selected={account.name === selectedAccount.name}
                onClick={(event) => handleAccountClick(event, account)}
              >
                <div className={styles.description}>{account.name}  ${account.balances.current}</div>
              </ListItemButton>
            </ListItem>
            )
          })}
          </List>
        </div>
        <AreaGraph 
          data={graphData}
        />
        <div>
          <div className={styles.result}>
            <div className={styles.futureBalance}>${futureBalance}</div>
            <div className={styles.description}>Balance after {duration} years</div>
          </div>
          <FormControl>
            <NumberFormat
              customInput={TextField}
              id="annual_contributions"
              label="Annual Contributions"
              value={contributions}
              onValueChange={(values) => {
                if (values.floatValue) {
                  setContributions(values.floatValue);
                }
              }}
              thousandSeparator
              isNumericString
              allowNegative={false}
              prefix="$"
              InputProps={{ style: {color: 'white'} }}
              InputLabelProps={{ shrink: true }}
              onBlur={(e: { target: { value: string; id: string; } }) => {handleBlur(e.target.value, e.target.id)}}
            />
            <NumberFormat
              customInput={TextField}
              id="rate_of_return"
              label="Rate of Return"
              value={rate}
              onValueChange={(values) => {
                if (values.floatValue) {
                  setRate(values.floatValue);
                }
              }}
              isNumericString
              allowNegative={false}
              suffix="%"
              InputProps={{ style: {color: 'white'} }}
              InputLabelProps={{ shrink: true }}
              onBlur={(e: { target: { value: string; id: string; } }) => {handleBlur(e.target.value, e.target.id)}}
            />
            <NumberFormat
              customInput={TextField}
              id="duration"
              label="Years of Growth"
              value={duration}
              onValueChange={(values) => {
                if (values.floatValue) {
                  setDuration(values.floatValue);
                }
              }}
              isNumericString
              allowNegative={false}
              decimalScale={0}
              isAllowed={values => {
                if (values.floatValue == null) {
                    return values.formattedValue === ''
                } else {
                    return (values.floatValue <= 50 && values.floatValue >= 1)
                }
              }}
              InputProps={{ style: {color: 'white'} }}
              InputLabelProps={{ shrink: true }}
              onBlur={(e: { target: { value: string; id: string; } }) => {handleBlur(e.target.value, e.target.id)}}
            />
          </FormControl>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;