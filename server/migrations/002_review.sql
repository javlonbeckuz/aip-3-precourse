-- Server-side review switch: 1 opens lesson 4 early. Set only by hand (see README), never by a client.
ALTER TABLE students ADD COLUMN review INTEGER NOT NULL DEFAULT 0 CHECK (review IN (0, 1));
