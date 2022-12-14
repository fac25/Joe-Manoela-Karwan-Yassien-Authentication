BEGIN;

INSERT INTO users VALUES
  (1,'Yassien', 'a@example.com', '$2a$12$A74tKw96m82AEZpJrIEQxecZGscKayJD/hD5/I6DuqKEJoQlAlNYO', '2017-12-25 00:00:00'),
  (2,'Joe', 'b@example.com', '$2a$12$o2NP8ykiki.T11qRQOCnBeX68PhwXHprM/hxHkbAfqotWo2XT.vdW', '2017-12-25 00:00:00'),
  (3,'Manoela', 'c@example.com', '$2a$12$8HIQ9kqN0brBUfDigfSfB.9BlSsICw4LQ/tiw4U/zMW5QWtuTqMG6', '2017-12-25 00:00:00'),
  (4,'Karwan', 'd@example.com', '$2a$12$vpUb03L0WVHMfrHducL2SumogekzuPfh9Ych0Il8Zkt5Baqch7QZq', '2017-12-25 00:00:00'),
  (5,'Alex', 'e@example.com', '$2a$12$4luxIrDKiU.bpasgzWuRwurBeGX8JNc7Q.taioE6nP3ZUGsN8cH2i', '2017-12-25 00:00:00'),
  (6,'Pat', 'f@example.com', '$2a$12$.nvgl/CiZLYqnf6zz4Iq4OUGEN72OmArjhz6j5BCyKQz6i9TCDBfS', '2017-12-25 00:00:00'),
  (7,'Paz' ,'g@example.com', '$2a$12$fNhJ0RA8nAK.FVbYARXr7e8pMpR8hgLl11xkBpRdIyubrgapb6NeK', '2017-12-25 00:00:00'),
  (8,'Sumithra' ,'h@example.com', '$2a$12$M3CzlEMu7CqCJseuus70Ne4xAKFh795psGCgTQc1diZVL5UiYPqG.', '2017-12-25 00:00:00'),
  (9,'Lisa' ,'i@example.com', '$2a$12$lThFqSHOxWqsWU52CUcWeOcDWE70H6GedGDdRBk7QEb/1gfb/PBzm', '2017-12-25 00:00:00'),
  (10,'Abby' ,'j@example.com', '$2a$12$AEVcwDH6apiHoyJnZcgWaemY9gZ.fn2ZlTeQZKy.w4Pq7qptgyJtG', '2017-12-25 00:00:00')
ON CONFLICT DO NOTHING;

INSERT INTO stories VALUES
  (1, 'Little red riding hood', 'A young girl who comes across a cunning wolf on the way to her grandmas home', 9, '2020-09-24 22:00:00'),
  (2, 'The little mermaid', 'A young mermaid is willing to give up her life in the sea as a mermaid to gain a human soul', 2, '2020-09-25 21:00:00'),
  (3, 'Aladdin', 'A lovable street urchin meets Princess Jasmine, the beautiful daughter of the sultan of Agrabah', 4, '2020-09-26 20:00:00'),
  (4, 'Cinderella', 'A dreamer is trapped within a step-family who does not love or appreciate her and is enslaved by her evil stepmother and stepsisters', 7, '2020-09-27 19:00:00'),
  (5, 'The hobbit', 'Home-loving Bilbo Baggins, the titular hobbit, goes on a journey to win a share of the treasure guarded by a dragon named Smaug', 4, '2020-09-28 18:00:00'),
  (6, 'Game of Thrones', 'Nine noble families fight for control over the lands of Westeros, while an ancient enemy returns after being dormant for millennia', 8, '2020-09-29 16:00:00')

ON CONFLICT DO NOTHING;

COMMIT;