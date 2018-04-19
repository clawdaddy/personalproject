module.exports = {
    list: [
        {
            ADLSchemaID:0,
            ADLName:"Bed Mobility",
            explanation:"How resident adjusts self in bed",
            primary: {
                explain:"Self Performance",
                choicesID:0
            },
            secondary: {
                explain:"Support Provided",
                choicesID: 1,
            }
        },
        {
            ADLSchemaID:1,
            ADLName: "Bathing",
            explanation:"How resident bathes",
            primary:{
                explain:"Self Performance",
                choicesID:0,
                },   
            secondary:{
                explain: "Support Provided",
                choicesID: 1,
            },
            tertiary:{
                explain: "Type of Bathing",
                choicesID: 2,
            }
        },
        {
            ADLSchemaID:2,
            ADLName: "Transfers",
            explanation: "How the resident moves to and from bed, chair, wheelchair, standing",
            primary: {
                explain: "Self Performance",
                choicesID:0,
            },
            secondary: {
                explain: "Support Provided",
                choicesID:1,
            },
            // tertiary: {
            //     explain: "LAHWERTNKLALSDFKUHJ",
            //     choicesID:4
            // }
        }
    ],
    choiceIDs: [
        {
            //general level of independence
            ID: 0,
            choices: [
                {
                    choice:'Independent',
                    value: 0
                },
                {
                    choice:'Supervision', 
                    value: 1
                },
                {
                    choice: 'Limited Assistance',
                    value: 2
                },
                {
                    choice: 'Extensive Assistance',
                    value: 3
                },
                {
                    choice: 'Total Dependence',
                    value: 4
                },
                {
                    choice: 'Did Not Occur',
                    value: 8
                }
            ]
        },
        {
            //general assistance provided
            ID:1,
            choices: [
                {
                    choice:'No Setup',
                    value: 0
                },
                {
                    choice:'Setup', 
                    value: 1
                },
                {
                    choice: 'One Person Assist',
                    value: 2
                },
                {
                    choice: 'Two+ Person Assist',
                    value: 3
                },
                {
                    choice: 'Did Not Occur',
                    value: 8
                }
            ]
        },
        {
            //bathing choices
            ID:2,
            choices: [
                {
                    choice:'Shower', 
                    value: 0
                },
                {
                    choice:'Full body bath',
                    value:1 
                },
                {
                    choice:'Bed bath',
                    value:2
                }
            ]
        },
        // {
        //     ID:4,
        //     choices: [
        //         {
        //             choice:'Son of a',
        //             value:0
        //         }
        //     ]
        // }
    ]
    
}