import React, { useContext } from "react";
import Callout from "plaid-threads/Callout";
import Button from "plaid-threads/Button";
import Link from "../Link";
import Context from "../../Context";
import styles from "./index.module.scss";

const Header = () => {
  const {
    linkToken,
    linkSuccess,
    isItemAccess,
    backend,
    linkTokenError,
  } = useContext(Context);

  return (
    <div className={styles.grid}>
      <h3 className={styles.title}>ahead</h3>
      <h4 className={styles.subtitle}>A Roth IRA calculator integrated with Plaid</h4>
      {!linkSuccess ? (
        <>
          {/* message if backend is not running and there is no link token */}
          {!backend ? (
            <Callout warning>
              Unable to fetch link_token: please make sure your backend server
              is running and that your .env file has been configured with your
              <code>PLAID_CLIENT_ID</code> and <code>PLAID_SECRET</code>.
            </Callout>
          ) : /* message if backend is running and there is no link token */
          linkToken == null && backend ? (
            <Callout warning>
              <div>
                Unable to fetch link_token: please make sure your backend server
                is running and that your .env file has been configured
                correctly.
              </div>
              <div>
                Error Code: <code>{linkTokenError.error_code}</code>
              </div>
              <div>
                Error Type: <code>{linkTokenError.error_type}</code>{" "}
              </div>
              <div>Error Message: {linkTokenError.error_message}</div>
            </Callout>
          ) : linkToken === "" ? (
            <div className={styles.linkButton}>
              <button className={styles.button}>
                Loading...
              </button>
            </div>
          ) : (
            <div className={styles.linkButton}>
              <Link />
            </div>
          )}
        </>
      ) : (
        <>
          {isItemAccess ? (
            <></>
          ) : (
            <h4 className={styles.subtitle}>
              <Callout warning>
                Unable to create an item. Please check your backend server
              </Callout>
            </h4>
          )}
        </>
      )}
    </div>
  );
};

Header.displayName = "Header";
export default Header;
