import { useContext } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import styles from './index.module.scss';
import Context from "../../Context";

const Header = () => {
  const {
    profile,
  } = useContext(Context);

  return (
      <AppBar position="static" color="transparent">
        <Toolbar>
          <div className={styles.title}>
            ahead
          </div>
          <div className={styles.user}>{profile}</div>
        </Toolbar>
      </AppBar>
  );
};

Header.displayName = "Header";
export default Header;
