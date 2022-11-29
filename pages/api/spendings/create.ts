// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { PrismaClient } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  success: boolean;
};

type Body = {
  userId: string;
  colocId: string;
  amount: string;
  name: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { userId, colocId, amount, name } = req.body as Body;
  const prisma = new PrismaClient();
  const result = await prisma.spending.create({
    data: {
      name: name,
      amount: parseFloat(amount),
      user: {
        connect: {
          id: userId,
        },
      },
      coloc: {
        connect: {
          id: colocId,
        },
      },
    },
  });
  prisma.$disconnect();
  res.status(200).json({ success: true });
}
