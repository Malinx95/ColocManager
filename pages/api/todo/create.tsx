// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { PrismaClient } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  success: boolean;
};

type Body = {
  title: string;
  colocId: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { title, colocId } = req.body as Body;
  const prisma = new PrismaClient();
  const result = await prisma.todo.create({
    data: {
      title: title,
      colocId: colocId,
    },
  });
  prisma.$disconnect();
  res.status(200).json({ success: result ? true : false });
}
