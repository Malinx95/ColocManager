// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

type Data = {
  exists: boolean;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const prisma = new PrismaClient();
  let username = req.body.username;

  let user = await prisma.user.findUnique({
    where: {
      username: username,
    },
  });
  prisma.$disconnect();

  if (user) {
    res.status(200).json({ exists: true });
  } else {
    res.status(200).json({ exists: false });
  }
}
