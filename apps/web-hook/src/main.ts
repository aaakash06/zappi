import express from "express";
import cors from "cors";
import client from "@repo/db/client";
const app = express();
const db = client;
app.use(express.json());

app.use(cors());

app.post("/hooks/catch/:userId/:zapId", async (req, res) => {
  console.log("webhook was hit");
  // authentication should be added
  const userId: string = req.params.userId;
  const zapId: string = req.params.zapId;
  const body = req.body;
  await db.$transaction(async (tx) => {
    const zapRun = await tx.zapRun.create({
      data: {
        zapId,
        metadata: body,
      },
    });

    await tx.zapRunOutbox.create({
      data: {
        zapRunId: zapRun.id,
      },
    });
  });

  res.json({ message: "webhook received" });
});

app.listen(3001, () => {
  console.log("server listening");
});
