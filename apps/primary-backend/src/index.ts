// import express, { Router } from "express";
// import { userRouter } from "./routers/user";
// import { zapRouter } from "./routers/zap";
// import cors from "cors";
// import { db } from "./main";
import client from "@repo/db/client";

// const app = express();

// app.use(express.json());
// app.use(cors());

// app.use("/user", userRouter);
// app.use("/zap", zapRouter);
// console.log(db);

// app.listen(3000, () => {
//   console.log("server is listening");
// });

console.log(client);
