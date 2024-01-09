import callTheServer from "./callTheServer";

type Props = {
  intentId: string;
  setStatus: React.Dispatch<React.SetStateAction<string>>;
};

export async function checkPaymentStatus({ intentId, setStatus }: Props) {
  const response = await callTheServer({
    endpoint: `checkPaymentStatus/${intentId}`,
    method: "GET",
  });

  if (response?.status === 200) {
    setStatus(response?.message);
  }
}
