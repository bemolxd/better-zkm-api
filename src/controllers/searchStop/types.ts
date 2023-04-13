export type ParsedSearchSoap = {
  "soap:Envelope"?: {
    "soap:Body": [
      {
        GetStopsByNameResponse: [
          {
            GetStopsByNameResult: [
              {
                Stops: [
                  {
                    S: [
                      {
                        $: {
                          id: string;
                          name: string;
                          uwg: string;
                          x: string;
                          y: string;
                          u: string;
                          l: string;
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

export type AvailableStop = {
  id: number;
  name: string;
  comments: string;
  lng: number;
  lat: number;
  lines: AvailableStopLine[];
};

export type AvailableStopLine = {
  number: number;
  vehicleType: "A" | "T";
};
