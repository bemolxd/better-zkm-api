export type ParsedFullInfoSoap = {
  "soap:Envelope"?: {
    "soap:Body": [
      {
        GetPlanedDeparutresFullInfoResponse: [
          {
            GetPlanedDeparutresFullInfoResult: [
              {
                Schedules: [
                  {
                    $: {
                      time: string;
                    };
                    Stop: [
                      {
                        $: {
                          name: string;
                          num: string;
                          id: string;
                          mode: string;
                        };
                        Day: [
                          {
                            $: {
                              desc: string;
                              type: string;
                              actual: string;
                            };
                            R: [
                              {
                                $: {
                                  nr: string;
                                  nrk: string;
                                  vehType: string;
                                  desc: string;
                                };
                                S: [
                                  {
                                    $: {
                                      th: string;
                                      tm: string;
                                      uw: string;
                                      id_kursu: string;
                                      uid: string;
                                    };
                                    N?: [
                                      {
                                        $: {
                                          ozn: string;
                                          oznDesc: string;
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
      }
    ];
  };
};

export type StopFullInfo = {
  time: string;
  name: string;
  stopNr: number;
  id: number;
  lines: LineSchedule[];
};

export type LineSchedule = {
  number: number;
  vehicleType: "A" | "T";
  direction: string;
  working?: ScheduleDeparture[];
  saturday?: ScheduleDeparture[];
  sunday?: ScheduleDeparture[];
};

export type ScheduleDeparture = {
  hour: number;
  minute: number;
  courseId: number;
  uid: number;
  additionalInfo?: DepartureAdditionalInfo;
};

export type DepartureAdditionalInfo = {
  sign: string;
  description: string;
};
