import callTheServer from "./callTheServer";

type Props = {
  intentId: string;
  data: any;
  email: string;
};

export async function updatePaymentIntent({ intentId, data, email }: Props) {
  const response = await callTheServer({
    endpoint: "updatePaymentIntent",
    method: "POST",
    body: { intentId, data, email },
  });

  return response?.status === 200;
}
