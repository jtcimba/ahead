import React, { useEffect, useContext } from "react";
import { usePlaidLink } from "react-plaid-link";
import styles from "./index.module.scss";
import Context from "../../Context";
import Button from "@mui/material/Button";

const Link = () => {
  const { linkToken, dispatch } = useContext(Context);

  const onSuccess = React.useCallback(
    (public_token: string) => {
      const setToken = async () => {
        const response = await fetch("/api/set_access_token", {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
          },
          body: `public_token=${public_token}`,
        });
        if (!response.ok) {
          dispatch({
            type: "SET_STATE",
            state: {
              itemId: `no item_id retrieved`,
              accessToken: `no access_token retrieved`,
              isItemAccess: false,
            },
          });
          return;
        }
        const data = await response.json();
        dispatch({
          type: "SET_STATE",
          state: {
            itemId: data.item_id,
            accessToken: data.access_token,
            isItemAccess: true,
          },
        });
      };
      const setProfile = async () => {
        const response = await fetch('/api/identity', { method: "GET"});
        if (!response.ok) {
          return;
        }
        const identities = await response.json();
        dispatch({
          type: "SET_STATE",
          state: {
            profile: identities.identity.accounts[0].owners[0].names[0]
          }
        })
      }
      setToken();
      setProfile();
      dispatch({ type: "SET_STATE", state: { linkSuccess: true } });
      window.history.pushState("", "", "/");
    },
    [dispatch]
  );

  let isOauth = false;
  const config: Parameters<typeof usePlaidLink>[0] = {
    token: linkToken!,
    onSuccess
  };

  if (window.location.href.includes("?oauth_state_id=")) {
    // TODO: figure out how to delete this ts-ignore
    // @ts-ignore
    config.receivedRedirectUri = window.location.href;
    isOauth = true;
  }

  const { open, ready } = usePlaidLink(config);

  useEffect(() => {
    if (isOauth && ready) {
      open();
    }
  }, [ready, open, isOauth]);

  return (
    <Button sx={{fontSize: '16px'}} className={styles.getStartedButton} variant="contained" onClick={() => open()} disabled={!ready}>
      Get Started
    </Button>
  );
};

Link.displayName = "Link";

export default Link;
