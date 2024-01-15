type GradingCriteria = {
  highest: string;
  lowest: string;
  important: string;
  rubrics: string;
  isWholeFeedback: boolean;
};

type InProgress = {
  count: number;
  _created_at: string;
}

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
  inProgress: InProgress | null;
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
