select choiceexplanation, choices, numbervalue from adlschema as s
left join adlchoices as c
    on s.primarychoice = c.id
where s.id = $1;

--     select * from adlschema;
-- select * from adlchoices;
-- select choiceexplanation, choices, numbervalue from adlschema as s
-- left join adlchoices as c
--     on s.primarychoice = c.id;
-- select choiceexplanation, choices, numbervalue from adlschema as s
-- left join adlchoices as c
--     on s.secondarychoice = c.id;
-- select choiceexplanation, choices, numbervalue from adlschema as s
-- left join adlchoices as c
--     on s.tertiarychoice = c.id;