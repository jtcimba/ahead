import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import styles from './index.module.scss';

const Header = () => {
  return (
      <AppBar position="static" color="transparent">
        <Toolbar>
          <div className={styles.title}>
            ahead
          </div>
          <div className={styles.user}>User</div>
        </Toolbar>
      </AppBar>
  );
};

Header.displayName = "Header";
export default Header;
