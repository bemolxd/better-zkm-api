import type { Request } from "express";

export type RequestWithBody<TBody extends {}> = Omit<Request, "body"> & {
  body: TBody;
};
