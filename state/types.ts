type GradingCriteria = {
  highest: string;
  lowest: string;
  important: string;
  grading_system: string;
  isWholeFeedback: boolean;
};

type GradingResult = {
  grade: string;
  explanation: string;
};

export type UserType = {
  gradingCriteria: GradingCriteria | null;
  gradingResultsList: GradingResult[] | null;
  accessToken: string;
  pagesLeft: number;
  email: string;
  plan: string;
  subscriptionId: string | null;
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
