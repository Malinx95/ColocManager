// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { PrismaClient } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  success: boolean;
};

type Body = {
  title: string;
  date: string;
  colocId: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { title, colocId, date } = req.body as Body;
  const prisma = new PrismaClient();
  const result = await prisma.event.create({
    data: {
      title: title,
      date: date,
      colocId: colocId,
    },
  });
  prisma.$disconnect();
  res.status(200).json({ success: result ? true : false });
}
