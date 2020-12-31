import React, { createContext } from "react";
import useProviderJob from "./useProviderJob";

export const JobContext = createContext();

export default function JobContextProvider({ children }) {
  const job = useProviderJob();
  return <JobContext.Provider value={job}>{children}</JobContext.Provider>;
}
