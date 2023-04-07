import axios from "axios";

export const callSoap = async (xmls: string) =>
  await axios.post<string>(process.env.ZKM_SOAP_URL!, xmls, {
    headers: {
      "Content-Type": "text/xml",
      Cookie: (Math.random() + 1).toString(36),
    },
  });
