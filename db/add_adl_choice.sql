insert into adl 
(residentid, realuserid, adlid, primarychoice, primaryexplain, secondarychoice, secondaryexplain, tertiarychoice, tertiaryexplain)
values
($1, $2, $3, $4, $5, $6, $7, $8, $9)
returning id;