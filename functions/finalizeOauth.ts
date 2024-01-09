import callTheServer from "./callTheServer";

type Props = { code: string; state: string };

export default async function finalizeOauth({ code, state }: Props) {
  const response = await callTheServer({
    endpoint: "authenticate",
    method: "POST",
    body: { code },
  });

  if (response?.status === 200) {
    return { userData: response?.message, state };
  }
}
