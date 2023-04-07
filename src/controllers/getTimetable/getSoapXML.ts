export const getSoapXML = (
  stopId: string
) => `<?xml version='1.0' encoding='utf-8'?>
  <soap:Envelope
      xmlns:xsi='http://www.w3.org/2001/XMLSchema-instance'
      xmlns:xsd='http://www.w3.org/2001/XMLSchema'
      xmlns:soap='http://schemas.xmlsoap.org/soap/envelope/'>
      <soap:Body>
          <CNR_GetRealDepartures
              xmlns='http://PublicService/'>
              <id>${stopId}</id>
          </CNR_GetRealDepartures>
      </soap:Body>
  </soap:Envelope>`;
