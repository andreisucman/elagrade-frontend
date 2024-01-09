import callTheServer from "./callTheServer";

export async function socialAuth(orderPayload: string | null) {
  const endpoint = orderPayload
    ? `authorize?state=${orderPayload}`
    : "authorize";

  const response = await callTheServer({
    endpoint,
    method: "GET",
  });

  if (response?.status === 200) {
    window.location.href = response.message;
  }
}
