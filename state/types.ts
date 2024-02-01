type GradingCriteria = {
  highest: string;
  lowest: string;
  important: string;
  rubrics: string;
  isWholeFeedback: boolean;
};

export type UserType = {
  gradingCriteria: GradingCriteria | null;
  gradingResultsList: any[] | null;
  accessToken: string;
  pagesLeft: number;
  email: string;
  plan: string;
  customerId: string;
  subscriptionId: string | null;
  emailVerified: boolean;
} | null;

export type UserContextType = {
  userDetails: UserType | null;
  defaultUser?: UserType | null;
  setUserDetails: React.Dispatch<React.SetStateAction<UserType | null>>;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  isLoading: boolean;
};

export type UserContextProviderProps = {
  children: React.ReactNode;
};
