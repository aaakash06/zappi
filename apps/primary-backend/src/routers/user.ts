import { Router } from "express";
import { SignupSchema } from "../types/types";
import client from "@repo/db/client";
import bcrypt from "bcrypt";

const SALT_ROUNDS = 10;

const router = Router();

const db = client;

router.post("/signup", async (req, res) => {
  try {
    const body = req.body;
    const parsedData = SignupSchema.safeParse(body);
    if (!parsedData.success) {
      console.log("wrong req body for signup");
      return res.status(411).json({
        message: "Incorrect req body",
      });
    }
    const email = parsedData.data.email;
    const name = parsedData.data.name;
    const userExists = await db.user.findFirst({
      where: {
        email,
      },
    });
    if (userExists) {
      console.log("already found a user with same email");
      return res.status(403).json({
        message: "you are already registered",
      });
    }

    const hashPassword: string = bcrypt.hashSync(
      parsedData.data.password,
      SALT_ROUNDS
    );
    const newUser = await db.user.create({
      data: {
        email,
        name,
        password: hashPassword,
      },
    });

    res.status(200).json({ message: "Verify your email" });

    // send verification email
  } catch (e) {
    console.log("some error occured in signup");
    console.log(e);
    res.status(400).json({ message: "some error occured in the server" });
  }
});

export const userRouter = router;
