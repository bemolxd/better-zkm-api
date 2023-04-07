export type ParsedStopSoap = {
  "soap:Envelope"?: {
    "soap:Body": [
      {
        GetGoogleStopsResponse: [
          {
            GetGoogleStopsResult: [
              {
                Stops: [
                  {
                    S: [
                      {
                        $: {
                          id: string;
                          sl: string;
                          nr: string;
                          n: string;
                          uwag: string;
                          t: string;
                          x: string;
                          y: string;
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

export type Stop = {
  id: number;
  number: number;
  name: string;
  vehicleType: "A" | "T";
  comments: string;
  posX: number;
  posY: number;
};
