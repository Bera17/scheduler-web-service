CREATE TABLE "scheduler-app".records
  (
    recordId  serial      PRIMARY KEY,
    etat     varchar(50)   NOT NULL,
    avancement   integer   NOT NULL,
    titre    varchar(50)   NOT NULL,
    canal   integer     NOT NULL,
    typeSource  varchar(50) NULL
  )


  
INSERT INTO "scheduler-app".records(
recordid, etat, avancement, titre, "canalId", "start", "end")
VALUES (DEFAULT, 'creation', 0, 'Meeting', 2, '2021-04-26T06:00:00.000Z', '2021-04-26T07:00:00.000Z');
	
INSERT INTO "scheduler-app".records(
	recordid, etat, avancement, titre, "canalId", "start", "end")
	VALUES (DEFAULT, 'Fini', 100, 'Meeting', 3, '2021-04-26T09:00:00.000Z', '2021-04-26T10:00:00.000Z');
	
	