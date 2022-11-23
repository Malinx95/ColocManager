import { Coloc, User } from "@prisma/client";

export type UserWithColocs =
  | (Omit<User, "password"> & {
      Coloc: Coloc[];
    })
  | null;
