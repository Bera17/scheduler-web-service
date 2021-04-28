CREATE TABLE "scheduler-app".canaux
  (
    canalId  serial      PRIMARY KEY,
    nom     varchar(50)   NOT NULL,
    visible   boolean   NOT NULL
  );

CREATE TYPE "scheduler-app".canaltype AS ENUM ('SDI', 'Stream');

ALTER TABLE "scheduler-app".canaux
    ADD COLUMN type "scheduler-app".canaltype;


INSERT INTO "scheduler-app".canaux("canalId", nom, visible, type)
	VALUES (DEFAULT, 'A-NOC-01', 'true', 'Stream');
INSERT INTO "scheduler-app".canaux("canalId", nom, visible, type)
	VALUES (DEFAULT, 'A-NOC-02', 'true', 'Stream');
INSERT INTO "scheduler-app".canaux("canalId", nom, visible, type)
	VALUES (DEFAULT, 'A-NOC-03', 'true', 'Stream');
INSERT INTO "scheduler-app".canaux("canalId", nom, visible, type)
	VALUES (DEFAULT, 'A-NOC-04', 'true', 'Stream');
INSERT INTO "scheduler-app".canaux("canalId", nom, visible, type)
	VALUES (DEFAULT, 'A-NOC-05', 'true', 'Stream');
INSERT INTO "scheduler-app".canaux("canalId", nom, visible, type)
	VALUES (DEFAULT, 'A-NOC-06', 'true', 'Stream');
INSERT INTO "scheduler-app".canaux("canalId", nom, visible, type)
	VALUES (DEFAULT, 'A-NOC-07', 'true', 'Stream');
INSERT INTO "scheduler-app".canaux("canalId", nom, visible, type)
	VALUES (DEFAULT, 'A-NOC-08', 'true', 'Stream');
INSERT INTO "scheduler-app".canaux("canalId", nom, visible, type)
	VALUES (DEFAULT, 'A-NOC-09', 'true', 'Stream');
INSERT INTO "scheduler-app".canaux("canalId", nom, visible, type)
	VALUES (DEFAULT, 'A-NOC-10', 'true', 'Stream');
INSERT INTO "scheduler-app".canaux("canalId", nom, visible, type)
	VALUES (DEFAULT, 'A-NOC-11', 'true', 'Stream');
INSERT INTO "scheduler-app".canaux("canalId", nom, visible, type)
	VALUES (DEFAULT, 'A-NOC-12', 'true', 'Stream');
INSERT INTO "scheduler-app".canaux("canalId", nom, visible, type)
	VALUES (DEFAULT, 'A-NOC-13', 'true', 'Stream');
INSERT INTO "scheduler-app".canaux("canalId", nom, visible, type)
	VALUES (DEFAULT, 'A-NOC-14', 'true', 'Stream');
INSERT INTO "scheduler-app".canaux("canalId", nom, visible, type)
	VALUES (DEFAULT, 'A-NOC-15', 'true', 'Stream');