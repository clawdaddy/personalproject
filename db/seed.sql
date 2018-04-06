create table if not exists caregivers (
id SERIAL PRIMARY KEY,
firstName varchar(30),
lastName varchar(30),
authZeroID text)