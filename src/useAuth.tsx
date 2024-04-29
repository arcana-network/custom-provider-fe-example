import { AuthContext, AuthContextType } from "./ProvideAuth";
import React from "react";

export const useAuth = (): AuthContextType => {
  const context = React.useContext(AuthContext);
  if (context == null) {
    throw new Error(
      "`useAuth` Hook and `Auth` component must be used inside `ProvideAuth`"
    );
  }
  return context;
};
