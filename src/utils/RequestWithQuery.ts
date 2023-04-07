import type { Request } from "express";

export type RequestWithQuery<TQuery extends {}> = Omit<Request, "query"> & {
  query: TQuery;
};
