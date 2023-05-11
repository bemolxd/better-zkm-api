import { Response } from "express";

type Args = {
  fc: string[];
  tc: string[];
  time: string;
  date: string;
};

type MapQueryReturnType = {
  px1: string;
  py1: string;
  px2: string;
  py2: string;
  time: string;
  date: string;
};

export const mapQuery = ({ fc, tc, time, date }: Args): MapQueryReturnType => {
  return {
    px1: fc[0],
    py1: fc[1],
    px2: tc[0],
    py2: tc[1],
    time,
    date,
  };
};
