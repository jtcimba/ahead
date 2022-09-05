import { useState, useEffect, useContext, SyntheticEvent } from "react";
import AreaGraph from "./Graphs/AreaGraph";
import styles from "./index.module.scss";
import TextField from '@mui/material/TextField';
import NumberFormat from 'react-number-format';
import FormControl from '@mui/material/FormControl';
import Box from '@mui/material/Box';
import logo from "../assets/ahead.svg";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Context from "../Context";
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import { useTheme } from '@mui/material/styles';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

var formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  maximumFractionDigits: 0
});

const Dashboard = () => {
  const theme = useTheme();
  const [accounts, setAccounts] = useState<any>([]);
  const [selectedAccount, setSelectedAccount] = useState<any>({});
  const [futureBalance, setFutureBalance] = useState<any>();
  const [duration, setDuration] = useState<any>(5);
  const [contributions, setContributions] = useState<any>(6000);
  const [rate, setRate] = useState<any>(6.0);
  const [graphData, setGraphData] = useState<any>([]);
  const {profile} = useContext(Context);
  const [tabValue, setTabValue] = useState(0);

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
      const thisYear = new Date().getFullYear();
      let dataSet = [{x: thisYear.toString(), y: selectedAccount.balances.current, label: formatter.format(selectedAccount.balances.current)}];
      for (let i = 1; i <= duration; i++) {
        let total = selectedAccount.balances.current * (Math.pow((1+(rate*0.01)), i)) + 
          contributions * ((rate === 0) ? i : ((Math.pow((1+(rate*0.01)), i)-1)/(rate*0.01)) * (1+rate*0.01));
        dataSet.push({x: (thisYear+i).toString(), y: total, label: formatter.format(total)});
      }
      setFutureBalance(dataSet.slice(-1)[0]['y']);
      setGraphData(dataSet);
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

  const handleTabChange = (event: SyntheticEvent, newValue: number) => {
    setTabValue(newValue)
    setSelectedAccount(accounts[newValue])
  }

  return (
    <Box sx={{ display: 'flex', backgroundColor: 'white' }}>
      <Box
        sx={{
          height: '100vh',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '20px 15px 10px 15px',
          flexDirection: 'column',
          backgroundColor: 'white',
          width: '240px'
        }}
      >
        <Box>
          <img src={logo} className={styles.logo} alt="ahead logo"/>
          <div className={styles.accountsHeader}>Accounts</div>
          <Tabs
            value={tabValue}
            variant="scrollable"
            scrollButtons="auto"
            orientation="vertical"
            onChange={handleTabChange}
            sx={{maxHeight: '400px'}}
          >{
            accounts?.map((account: any) => {
              return <Tab sx={{textTransform: 'none', fontSize: '14px', padding: '5px'}} label={account.name}/>
            })
          }
          </Tabs>
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center', padding: '20px 10px 10px 10px'}}>
            <AccountCircleIcon sx={{fontSize: '2rem'}}/>
            <div className={styles.profileName}>{profile}</div>
        </Box>
      </Box>
      <Box sx={{
        backgroundColor: `${theme.palette.info.main}`, 
        width: '100%', 
        borderTopLeftRadius: '15px', 
        borderBottomLeftRadius: '15px', 
        padding: '70px 100px 50px 100px'}}>
        <Box sx={{maxWidth: '850px'}}>
          <Box sx={{padding: '0px 0px 10px 0px'}}>
            <Box>Current Balance: {formatter.format(selectedAccount.balances?.current)}</Box>
          </Box>
          <Grid container spacing={4} sx={{}}>
            <Grid item sm={12} md={8} sx={{display: 'flex', flexGrow: '1'}}>
              <Card sx={{ backgroundColor: 'white', borderRadius: '15px', padding: '25px'}}>
                <AreaGraph
                  data={graphData}
                />
              </Card>
            </Grid>
            <Grid container direction="column" item spacing={4} sm={12} md={4}>
              <Grid item>
                <Card sx={{ backgroundColor: `${theme.palette.primary.main}`, color: 'white', padding: '15px', borderRadius: '15px'}}>
                  <Box>Future Balance</Box>
                  <Box sx={{fontSize: '20px'}}>{formatter.format(futureBalance)}</Box>
                  <Box sx={{color: `${theme.palette.info.main}`, fontSize: '12px'}}>after {duration} years</Box>
                </Card>
              </Grid>
              <Grid item sx={{display: 'flex', flexGrow: '1'}}>
                <Card sx={{width: '100%', borderRadius: '15px', marginTop: 'auto'}}>
                  <FormControl sx={{ padding: '20px'}}>
                    <NumberFormat
                      customInput={TextField}
                      id="annual_contributions"
                      label="Annual Contributions"
                      sx={{margin: '10px'}}
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
                      InputLabelProps={{ shrink: true, sx: {fontSize: '1.2rem' }}}
                      InputProps={{ sx: {fontSize: '1.2rem'}}}
                      onBlur={(e: { target: { value: string; id: string; } }) => {handleBlur(e.target.value, e.target.id)}}
                    />
                    <NumberFormat
                      customInput={TextField}
                      id="rate_of_return"
                      label="Rate of Return"
                      sx={{margin: '10px'}}
                      value={rate}
                      onValueChange={(values) => {
                        if (values.floatValue) {
                          setRate(values.floatValue);
                        }
                      }}
                      isNumericString
                      allowNegative={false}
                      suffix="%"
                      InputLabelProps={{ shrink: true, sx: {fontSize: '1.2rem' }}}
                      InputProps={{ sx: {fontSize: '1.2rem'}}}
                      onBlur={(e: { target: { value: string; id: string; } }) => {handleBlur(e.target.value, e.target.id)}}
                    />
                    <NumberFormat
                      customInput={TextField}
                      id="duration"
                      label="Years of Growth"
                      sx={{margin: '10px'}}
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
                      InputLabelProps={{ shrink: true, sx: {fontSize: '1.2rem' }}}
                      InputProps={{ sx: {fontSize: '1.2rem'}}}
                      onBlur={(e: { target: { value: string; id: string; } }) => {handleBlur(e.target.value, e.target.id)}}
                    />
                  </FormControl>
                </Card>
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;