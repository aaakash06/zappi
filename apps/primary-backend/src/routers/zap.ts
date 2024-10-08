import { Router } from "express";
import client from "@repo/db/client";
import authMiddleware from "../middleware";
import { zapCreateSchema } from "../types/types";

const router = Router();

const db = client;

router.post("/", authMiddleware, async (req, res) => {
  //@ts-ignore
  const id: string = req.id;
  try {
    const body = req.body;
    const parsedData = zapCreateSchema.safeParse(body);
    if (!parsedData.success) {
      return res.status(411).json({ message: "invalid input" });
    }

    const zapId = await db.$transaction(async (tx) => {
      const newZap = await tx.zap.create({
        data: {
          userId: parseInt(id),
          triggerId: "",
          actions: {
            create: parsedData.data.actions.map((action, index) => {
              return {
                actionType: action.availableActionId,
                sortingOrder: index,
              };
            }),
          },
        },
      });

      const trigger = await tx.trigger.create({
        data: {
          triggerType: parsedData.data.availableTriggerId,
          zapId: newZap.id,
        },
      });
      await tx.zap.update({
        where: {
          id: newZap.id,
        },
        data: {
          triggerId: trigger.id,
        },
      });

      return newZap.id;
    });
    res.status(200).json({
      zapId,
    });
  } catch (e) {
    console.log("error while create zap ");
    res.status(403).json({ message: "some error occured" });
  }
});
router.get("/", authMiddleware, async (req, res) => {
  //@ts-ignore
  const id: string = req.id;
  try {
    const allZaps = await db.zap.findMany({
      where: {
        userId: parseInt(id),
      },
      include: {
        actions: {
          include: {
            type: true,
          },
        },
        trigger: {
          include: {
            type: true,
          },
        },
      },
    });
    res.status(200).json({ zaps: allZaps });
  } catch (e) {
    console.log("error while create zap ");
    res.status(403).json({ message: "some error occured" });
  }
});
router.get("/:zapId", authMiddleware, async (req, res) => {
  //@ts-ignore
  const id = req.id;
  const zapId = req.params.zapId;

  try {
    const zap = await db.zap.findFirst({
      where: {
        id: zapId,
        userId: parseInt(id),
      },
      include: {
        actions: {
          include: {
            type: true,
          },
        },
        trigger: {
          include: {
            type: true,
          },
        },
      },
    });
    return res.status(200).json({ zap });
  } catch (e) {
    console.log("error while create zap ");
    res.status(403).json({ message: "some error occured" });
  }
});

export const zapRouter = router;
