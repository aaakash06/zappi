import { Router } from "express";
import { SigninSchema, SignupSchema } from "../types/types";
import client from "@repo/db/client";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import authMiddleware from "../middleware";

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
router.post("/signin", async (req, res) => {
  try {
    const body = req.body;
    const parsedData = SigninSchema.safeParse(body);
    if (!parsedData.success) {
      console.log("wrong req body for signin");
      return res.status(411).json({
        message: "Incorrect req body",
      });
    }
    const email = parsedData.data.email;
    const user = await db.user.findFirst({
      where: {
        email,
      },
    });
    if (!user) {
      console.log("no user found with same email");
      return res.status(403).json({
        message: "you are not registered",
      });
    }

    const isPasswordCorrect = await bcrypt.compare(
      parsedData.data.password,
      user.password
    );

    if (isPasswordCorrect) {
      const token = jwt.sign(
        { id: user.id },
        process.env.JWT_SECRET || "somepasswordsecret"
      );
      res.status(200).json({ token });
    } else {
      res.status(403).json({ message: "wrong credentials" });
    }
  } catch (e) {
    console.log("some error occured in signup");
    console.log(e);
    res.status(400).json({ message: "some error occured in the server" });
  }
});

router.get("/", authMiddleware, async (req, res) => {
  //@ts-ignore
  const id = req.id;
  const user = await db.user.findFirst({
    where: {
      id,
    },
    select: {
      name: true,
      email: true,
    },
  });
  res.status(200).json({ user });
});
export const userRouter = router;
