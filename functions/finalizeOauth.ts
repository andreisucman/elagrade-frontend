import callTheServer from "./callTheServer";

type Props = { code: string };

export default async function finalizeOauth({ code }: Props) {
  await callTheServer({
    endpoint: "authenticate",
    method: "POST",
    body: { code },
  });
}
