import React, { createContext } from "react";
import useProviderAuth from "./useProviderAuth";

export const AuthContext = createContext();

export default function AuthContextProvider({ children }) {
  const auth = useProviderAuth();
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
}
