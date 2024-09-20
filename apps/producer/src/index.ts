import { Kafka } from "kafkajs";
import client from "@repo/db/client";

const TOPIC_NAME = "zap-events";

const kafka = new Kafka({
  clientId: "outbox-processor",
  brokers: ["localhost:9092"],
});

const db = client;

const main = async () => {
  const producer = kafka.producer();
  await producer.connect();
  while (1) {
    const pendingRows = await db.zapRunOutbox.findMany({
      where: {},
      take: 10,
    });
    console.log(pendingRows);
    // Producing
    await producer.send({
      topic: TOPIC_NAME,
      messages: pendingRows.map((row) => {
        return {
          value: row.zapRunId,
        };
      }),
    });
    await client.zapRunOutbox.deleteMany({
      where: {
        id: {
          in: pendingRows.map((r) => r.id),
        },
      },
    });
    await new Promise((r) => setTimeout(r, 3000));
  }
};

main().catch(console.error);
