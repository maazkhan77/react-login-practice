import { Outlet } from "react-router-dom";
import useRefreshToken from "../hooks/useRefreshToken";
import useAuth from "../hooks/useAuth";
import { useEffect, useState } from "react";
import useLocalStorage from "../hooks/useLocalStorage";

const PersistLogin = () => {
  const [isLoading, setIsLoading] = useState(true);
  const refresh = useRefreshToken();
  const { auth } = useAuth();
  const [persist] = useLocalStorage('persist', false)

  useEffect(() => {
    const verifyRefreshToken = async () => {
      try {
        await refresh();
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    !auth?.accessToken ? verifyRefreshToken() : setIsLoading(false);
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    console.log(`isLoading ${isLoading}`);
    console.log(`aT: ${JSON.stringify(auth?.accessToken)}`);
    // eslint-disable-next-line
  }, [isLoading]);

  return (
    <>
        {!persist
            ? <Outlet />
            : isLoading 
                ? <p>Loaidng...</p> 
                : <Outlet />}
    </>
  )
};

export default PersistLogin;
