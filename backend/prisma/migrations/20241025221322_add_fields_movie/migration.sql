/*
  Warnings:

  - Added the required column `description` to the `Movie` table without a default value. This is not possible if the table is not empty.
  - Added the required column `poster` to the `Movie` table without a default value. This is not possible if the table is not empty.
  - Added the required column `totalMinutes` to the `Movie` table without a default value. This is not possible if the table is not empty.
  - Added the required column `year` to the `Movie` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Movie" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "year" INTEGER NOT NULL,
    "poster" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "totalMinutes" INTEGER NOT NULL
);
INSERT INTO "new_Movie" ("id", "name") SELECT "id", "name" FROM "Movie";
DROP TABLE "Movie";
ALTER TABLE "new_Movie" RENAME TO "Movie";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
