type Args = {
  px1: string;
  py1: string;
  px2: string;
  py2: string;
  time: string;
  date: string;
};

export const getSoapXML = ({
  px1,
  py1,
  px2,
  py2,
  time,
  date,
}: Args) => `<?xml version='1.0' encoding='utf-8'?>
<soap:Envelope
	xmlns:xsi='http://www.w3.org/2001/XMLSchema-instance'
	xmlns:xsd='http://www.w3.org/2001/XMLSchema'
	xmlns:soap='http://schemas.xmlsoap.org/soap/envelope/'>
	<soap:Body>
		<SearchConnection
			xmlns='http://PublicService/'>
			<px1>${px1}</px1>
			<py1>${py1}</py1>
			<px2>${px2}</px2>
			<py2>${py2}</py2>
			<rozp>${time}</rozp>
			<data>${date}</data>
			<lang>PL</lang>
			<ile_przes>4</ile_przes>
			<tryb>0</tryb>
		</SearchConnection>
	</soap:Body>
</soap:Envelope>`;
