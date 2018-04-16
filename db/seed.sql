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

insert into facility
(caregroups)
values
('{"example group", "example group 2"}')

-- updating one group, or adding a group (if adding put in an array number that doesn't exist yet)
-- update facility set caregroups[1] = 'example group 3'
-- where id = 1;