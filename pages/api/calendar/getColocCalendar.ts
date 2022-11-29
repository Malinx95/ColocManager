// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { Coloc, Event, PrismaClient, Todo } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = Event[];

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const prisma = new PrismaClient();
  let colocId = req.body.colocId;
  let result = await prisma.event.findMany({
    where: {
      colocId: colocId,
    },
  });
  prisma.$disconnect();
  // order the events by date
  result.sort((a, b) => {
    return new Date(a.date).getTime() - new Date(b.date).getTime();
  });

  res.status(200).json(result);
}
