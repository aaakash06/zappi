import express, { Router } from "express";
import { userRouter } from "./routers/user";
import { zapRouter } from "./routers/zap";
import cors from "cors";

const app = express();

app.use(express.json());
app.use(cors());

app.use("/user", userRouter);
app.use("/zap", zapRouter);

app.listen(3000, () => {
  console.log("server is listening");
});
