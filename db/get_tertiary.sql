select choiceexplanation, choices, numbervalue from adlschema as s
left join adlchoices as c
    on s.tertiarychoice = c.id
where s.id = $1;