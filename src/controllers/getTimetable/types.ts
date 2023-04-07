export type ParsedTimetableSoap = {
  "soap:Envelope"?: {
    "soap:Body": [
      {
        CNR_GetRealDeparturesResponse: [
          {
            CNR_GetRealDeparturesResult: [
              {
                Schedules: [
                  {
                    $: {
                      time: string;
                    };
                    Stop: [
                      {
                        $: {
                          ds: string;
                          id: string;
                          name: string;
                        };
                        Day: [
                          {
                            $: {
                              desc: string;
                              type: string;
                            };
                            R: [
                              {
                                $: {
                                  dir: string;
                                  nr: string;
                                  vt: string;
                                  vuw: string;
                                };
                                S: [
                                  {
                                    $: {
                                      id: string;
                                      kuw: string;
                                      m: string;
                                      nb: string;
                                      s: string;
                                      t: string;
                                      th: string;
                                      tm: string;
                                      uw: string;
                                      veh: string;
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
              }
            ];
          }
        ];
      }
    ];
  };
};

export type StopTimetable = {
  time: string;
  id: number;
  name: string;
  day: Day;
  departures: Departure[] | undefined;
};

type Day = {
  type: string;
  description: string;
};

type Departure = {
  id: number;
  direction: string;
  number: number;
  vehicleType: "A" | "T";
  secondsLeft: number;
  time: string;
};
