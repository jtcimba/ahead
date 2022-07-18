import { useContext } from "react";
import Context from "../Context";
import styles from "./index.module.scss";
import Callout from "plaid-threads/Callout";
import Link from "./Link";
import { Navigate } from "react-router-dom";

const LandingPage = () => {
  const {
    linkToken,
    linkSuccess,
    isItemAccess,
    backend,
    linkTokenError
  } = useContext(Context);

  return (
    <div className={styles.container}>
      <div className={styles.grid}>
      <h3 className={styles.title}>ahead</h3>
      <h4 className={styles.subtitle}>A compound interest calculator integrated with Plaid</h4>
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
            <Navigate to="/dashboard" replace={true} />
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
    </div>
  )
};

export default LandingPage;