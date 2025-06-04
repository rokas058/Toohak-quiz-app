import { HostSessionContext } from "@contexts/HostSessionContext";
import { useContext } from "react";

export const useHostSessionContext = () => {
  const context = useContext(HostSessionContext);
  if (context === null)
    throw new Error(
      "Must use useHostSessionContext inside of HostSessionProvider",
    );
  return context;
};
