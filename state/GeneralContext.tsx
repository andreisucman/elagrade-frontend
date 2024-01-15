import React, { createContext, useState, useEffect } from "react";
import callTheServer from "@/functions/callTheServer";
import type {
  UserContextType,
  UserContextProviderProps,
  UserType,
} from "./types";

export const defaultUser: UserType = {
  gradingCriteria: {
    highest: "",
    lowest: "",
    rubrics: "",
    important: "",
    isWholeFeedback: false,
  },
  gradingResultsList: [],
  accessToken: "",
  customerId: "",
  pagesLeft: 0,
  email: "",
  plan: "",
  emailVerified: false,
  subscriptionId: null,
  times: null;
};

const defaultSetUser: React.Dispatch<React.SetStateAction<UserType>> = () => {};
const defaultSetIsLoading: React.Dispatch<
  React.SetStateAction<boolean>
> = () => {};

export const GeneralContext = createContext<UserContextType>({
  isLoading: true,
  userDetails: defaultUser,
  setUserDetails: defaultSetUser,
  setIsLoading: defaultSetIsLoading,
});

const GeneralContextProvider: React.FC<UserContextProviderProps> = ({
  children,
}) => {
  const [userDetails, setUserDetails] = useState<UserType>(defaultUser);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    callTheServer({ endpoint: "getUserData", method: "GET" }).then(
      (response) => {
        if (response?.status === 200) {
          setUserDetails(response.message);
        }
        setIsLoading(false);
      }
    );
  }, []);

  return (
    <GeneralContext.Provider
      value={{
        userDetails,
        setUserDetails,
        setIsLoading,
        isLoading,
        defaultUser,
      }}
    >
      {children}
    </GeneralContext.Provider>
  );
};

export default GeneralContextProvider;
