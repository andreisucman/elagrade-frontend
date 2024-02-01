import callTheServer from "./callTheServer";

export default async function prepareAndDownloadReport(
  operationId: string,
  resultId: string,
  studentName: string
) {
  const response = await callTheServer({
    endpoint: `createDocxReport/${operationId}/${resultId}`,
    method: "GET",
  });

  if (response?.status === 200) {
    const a = document.createElement("a");
    a.href = response.message;
    a.download = `${studentName}.docx`;
    document.body.appendChild(a);
    a.click();

    document.body.removeChild(a);
  }
}
