-- CreateTable
CREATE TABLE "Coloc" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_ColocToUser" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,
    CONSTRAINT "_ColocToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "Coloc" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_ColocToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Coloc_name_key" ON "Coloc"("name");

-- CreateIndex
CREATE UNIQUE INDEX "_ColocToUser_AB_unique" ON "_ColocToUser"("A", "B");

-- CreateIndex
CREATE INDEX "_ColocToUser_B_index" ON "_ColocToUser"("B");
