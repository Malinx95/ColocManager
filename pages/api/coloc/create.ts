// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { PrismaClient } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  success: boolean;
  colocId: string;
};

type Body = {
  userId: string;
  colocName: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { userId, colocName } = req.body as Body;
  const prisma = new PrismaClient();
  const result = await prisma.coloc.create({
    data: {
      name: colocName,
      users: {
        connect: {
          id: userId,
        },
      },
    },
  });
  prisma.$disconnect();
  res.status(200).json({ success: true, colocId: result.id });
}
