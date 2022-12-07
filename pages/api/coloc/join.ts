// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { PrismaClient } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  success: boolean;
  colocId: string;
};

type Body = {
  userId: string;
  colocId: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { userId, colocId } = req.body as Body;
  const prisma = new PrismaClient();
  try {
    await prisma.coloc.update({
      where: {
        id: colocId,
      },
      data: {
        users: {
          connect: {
            id: userId,
          },
        },
      },
    });
  } catch (e) {
    prisma.$disconnect();
    res.status(200).json({ success: false, colocId: "" });
  }

  prisma.$disconnect();
  res.status(200).json({ success: true, colocId: colocId });
}
