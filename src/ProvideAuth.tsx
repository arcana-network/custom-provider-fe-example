// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import type { AuthProvider } from "@arcana/auth";
import React from "react";

export type AuthContextType = {
  loading: boolean;
  auth: AuthProvider;
  loggedIn: boolean;
};
export const AuthContext = React.createContext<AuthContextType | null>(null);

const ProvideAuth = ({
  children,
  provider,
}: {
  children?: React.ReactNode;
  provider: AuthProvider;
}) => {
  const auth = useProvideAuth(provider);
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
};

const useProvideAuth = (auth: AuthProvider): AuthContextType => {
  const [loading, setLoading] = React.useState(true);
  const [loggedIn, setLoggedIn] = React.useState(false);
  console.log(auth);
  React.useEffect(() => {
    auth.init().then(async () => {
      if (await auth.isLoggedIn()) {
        setLoggedIn(true);
      }
      setLoading(false);
    });
  }, []);

  React.useEffect(() => {
    const disconnectHandler = () => {
      setLoggedIn(false);
    };
    const connectHandler = () => {
      setLoggedIn(true);
    };
    auth.provider.on("disconnect", disconnectHandler);
    auth.provider.on("connect", connectHandler);
    return () => {
      auth.provider.removeListener("disconnect", disconnectHandler);
      auth.provider.removeListener("connect", connectHandler);
    };
  });

  return {
    auth,
    loading,
    loggedIn,
  };
};

export default ProvideAuth;
