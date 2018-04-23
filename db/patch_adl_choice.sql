update adl
set primarychoice = $1, 
    primaryexplain = $2,
    secondarychoice = $3,
    secondaryexplain = $4,
    tertiarychoice = $5,
    tertiaryexplain = $6,
    realuserid = $7
where id = $8
returning id;
