import app from "../app";
import { NowRequest, NowResponse } from "@vercel/node";
import { Request, Response } from "express";

export default function handler(req: NowRequest, res: NowResponse) {
  // Adaptar la request/response de Vercel a Express
  return app(req as unknown as Request, res as unknown as Response);
}
