create table if not exists caregivers (
id SERIAL PRIMARY KEY,
firstName varchar(30),
lastName varchar(30),
authZeroID text);

create table if not exists facility (
id SERIAL PRIMARY KEY,
careGroups varchar(30)[]
);

create table if not exists residents (
id SERIAL PRIMARY KEY,
facilityId integer references facility,
careGroup varchar(30),
firstName varchar(30),
lastName varchar(30),
diet varchar(30),
code varchar(30),
pic text,
);

create table if not exists adl (
id SERIAL PRIMARY KEY,
residentID INTEGER REFERENCES residents,
caregiverID INTEGER REFERENCES caregivers,
adlID INTEGER,
primaryChoice INTEGER,
secondaryChoice INTEGER,
tertiaryChoice INTEGER,
timeOfadl TIMESTAMPTZ
);

create table if not exists adlchoices
(
id SERIAL PRIMARY KEY,
explanation varchar(60),
choices text[]
);

create table if not exists adlschema
(
id SERIAL PRIMARY KEY,
name varchar(30),
explanation varchar(60),
primarychoice integer references adlchoices,
secondarychoice integer references adlchoices,
tertiarychoice integer references adlchoices
);

insert into facility
(name, caregroups)
values
('test facility', '{"100 hall", "200 hall", "300 hall"}');
insert into facility
(name, caregroups)
values
('The Village', '{"first floor", "second floor"}');

insert into adlchoices 
(explanation, choices, numbervalue)
values ('How resident bathes',
'{"Shower", "Full Body Bath", "Bed Bath"}',
'{0,1,2}');

insert into adlchoices 
(explanation, choices, numbervalue)
values ('Support Provided',
'{"No Setup", "Setup", "One Person Assist", "Two+ Person Assist","Did Not Occur"}',
'{0,1,2,3,8}');

insert into adlchoices 
(explanation, choices, numbervalue)
values ('Self Performance',
'{"Independent", "Supervision", "Limited Assistance", "Extensive Assistance","Total Dependence", "Did Not Occur"}',
'{0,1,2,3,4,8}');

insert into adlschema 
(name, explanation, primarychoice, secondarychoice, tertiarychoice)
values
('Bed Mobility', 'How resident adjusts self in bed', 1, 2, null),
('Bathing', 'How resident bathes', 1, 2, 3),
('Transfers', 'How the resident moves to and from surfaces', 1, 2, null)
;
-- updating one group, or adding a group (if adding put in an array number that doesn't exist yet)
-- update facility set caregroups[1] = 'example group 3'
-- where id = 1;
insert into residents
(facilityid, firstname, lastname, age, diet, code, pic, group_name)
values
(1, 'Sue Ellen', 'Merriwhether', 68, 'Puree', 'full','https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/Quentin_Matsys_-_A_Grotesque_old_woman.jpg/182px-Quentin_Matsys_-_A_Grotesque_old_woman.jpg', '300 hall'),
(1, 'Bobby Sue', 'Merriwhether', 89, 'Chopped', 'full', 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Katharine_Hepburn_promo_pic.jpg/191px-Katharine_Hepburn_promo_pic.jpg', '300 hall'),
(1, 'Ricky Bobby', 'Merriwhether', 72, 'NPO', 'full', 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/00/Charlie_Chaplin.jpg/192px-Charlie_Chaplin.jpg', '300 hall'),
(1, 'lil Ricky', 'Merriwhether', 63, 'Regular', 'full', 'https://upload.wikimedia.org/wikipedia/commons/4/4a/Plato-raphael.jpg', '300 hall'),
(1, 'Torak', 'Merriwhether', 65, 'Regular', 'full', 'https://upload.wikimedia.org/wikipedia/commons/6/60/Chimpanzee_selfie.jpg', '300 hall')