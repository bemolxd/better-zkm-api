export type ParsedStreetSoap = {
  "soap:Envelope"?: {
    "soap:Body": [
      {
        GetStreetsResponse: [
          {
            GetStreetsResult: [
              {
                Streets: [
                  {
                    Street: [
                      {
                        _: string;
                        $: {
                          id: string;
                        };
                      }
                    ];
                  }
                ];
              }
            ];
          }
        ];
      }
    ];
  };
};

export type Street = {
  id: number;
  name: string;
};
