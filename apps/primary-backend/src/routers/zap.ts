import { Router } from "express";
import client from "@repo/db/client";

const router = Router();

const db = client;

export const zapRouter = router;
