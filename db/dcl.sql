use challenge;
INSERT INTO challenge.role (id, description, name) VALUES (1, 'Admin role', 'ADMIN');
INSERT INTO challenge.role (id, description, name) VALUES (2, 'User role', 'USER');
INSERT INTO challenge.role (id, description, name) VALUES (3, 'Chef role', 'CHEF');
INSERT INTO challenge.user (`id`,`email`,`name`,`password`,`phone`,`username`) VALUES (1,'admin@admin.com','Edgar Salazar','$2a$10$AKCBsu914Uw7JMnVLD9xpeTuj9S.qQB.4T.iHta1ghb.RSNrGDmcK','1234567789','admin');
INSERT INTO challenge.user_roles (`user_id`,`role_id`) VALUES (1,1);
