import callTheServer from "./callTheServer";

type Props = {
  email: string;
  isSignin?: boolean;
  password: string;
};

export async function emailAuth({ isSignin, email, password }: Props) {
  const response = await callTheServer({
    endpoint: isSignin ? "emailSignIn" : "emailSignUp",
    body: { email, password },
    method: "POST",
  });

  if (response?.status === 200) {
    return response?.message;
  }
}
