// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { PrismaClient } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  success: boolean;
};

type Body = {
  calendarId: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { calendarId } = req.body as Body;
  const prisma = new PrismaClient();
  const result = await prisma.event.delete({
    where: {
      id: calendarId,
    },
  });
  prisma.$disconnect();
  res.status(200).json({ success: result ? true : false });
}
