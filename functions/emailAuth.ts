import callTheServer from "./callTheServer";

type Props = {
  email: string;
  isSignIn?: boolean;
  password: string;
};

export async function emailAuth({ isSignIn, email, password }: Props) {
  const response = await callTheServer({
    endpoint: isSignIn ? "emailSignIn" : "emailSignUp",
    body: { email, password },
    method: "POST",
  });

  return response;
}
