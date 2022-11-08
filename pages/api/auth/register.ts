// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

type Data = {
  success: boolean;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const prisma = new PrismaClient();
  let username = req.body.username;
  let password = req.body.password;

  let result = await prisma.user.create({
    data: {
      username: username,
      password: password,
    },
  });
  prisma.$disconnect();
  if (result) {
    res.status(200).json({ success: true });
  } else {
    res.status(400).json({ success: false });
  }
}
