/*
  Warnings:

  - The primary key for the `Coloc` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Coloc" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL
);
INSERT INTO "new_Coloc" ("id", "name") SELECT "id", "name" FROM "Coloc";
DROP TABLE "Coloc";
ALTER TABLE "new_Coloc" RENAME TO "Coloc";
CREATE UNIQUE INDEX "Coloc_name_key" ON "Coloc"("name");
CREATE TABLE "new__ColocToUser" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,
    CONSTRAINT "_ColocToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "Coloc" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_ColocToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new__ColocToUser" ("A", "B") SELECT "A", "B" FROM "_ColocToUser";
DROP TABLE "_ColocToUser";
ALTER TABLE "new__ColocToUser" RENAME TO "_ColocToUser";
CREATE UNIQUE INDEX "_ColocToUser_AB_unique" ON "_ColocToUser"("A", "B");
CREATE INDEX "_ColocToUser_B_index" ON "_ColocToUser"("B");
CREATE TABLE "new_User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "username" TEXT NOT NULL,
    "firstName" TEXT,
    "lastName" TEXT,
    "password" TEXT NOT NULL
);
INSERT INTO "new_User" ("firstName", "id", "lastName", "password", "username") SELECT "firstName", "id", "lastName", "password", "username" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
