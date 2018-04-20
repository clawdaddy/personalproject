

// const adlSchema = require('./adlschema');

module.exports = {
    getadlSchema: (req, res, next) => {
        let adlList = null;
        let primaryResponse = null;
        let secondaryResponse = null;
        let tertiaryResponse = null;
        let secondarychoices = [];
        let tertiarychoices = [];
        req.app.get('db').get_adl_schema().then( response =>{
            
            //response comes back as an array with objects in it, each object has an id, name, explanation, primarychoice, secondarychoice, and tertiarychoice. The secondary and tertiary choices can be null.
            let adlList = []
            response.map( (adl, ind, array) => {
                let messengeradl = null
                let messengeradl2 = null
                let messengeradl3 = null
                req.app.get('db').get_primary([adl.id]).then( choiceResponse => {
                    
                    //choiceResponse comes back as choiceexplanation, choices[array of strings], numbervalue[array of integers]
                    primaryResponse = Object.assign({},choiceResponse[0]);
                    let primarychoices = primaryResponse.choices.map( (choice, i, arr) => {
                        return Object.assign( {}, {choice:arr[i], value:primaryResponse.numbervalue[i]})
                    })
                    messengeradl = Object.assign({}, adl, { primary:{
                        explain:primaryResponse.choiceexplanation,
                        choices:primarychoices,
                        selected: -1,
                        timeStamp: null
                    }})
                        req.app.get('db').get_secondary([adl.id]).then( choiceResponse => {
                            secondaryResponse = Object.assign({}, choiceResponse[0])
                            if (secondaryResponse.choices){
                                secondarychoices = secondaryResponse.choices.map( (choice, i, arr) => {
                                    return Object.assign( {}, {choice:arr[i], value:secondaryResponse.numbervalue[i]})
                                })
                            } else secondarychoices = []
                            messengeradl2 = Object.assign({}, messengeradl, { secondary:{
                                explain:secondaryResponse.choiceexplanation,
                                choices:secondarychoices,
                                selected: -1,
                                timeStamp: null
                            }})
                            req.app.get('db').get_tertiary([adl.id]).then( choiceResponse => {
                                tertiaryResponse = Object.assign({}, choiceResponse[0])
                                if (tertiaryResponse.choices){
                                    tertiarychoices = tertiaryResponse.choices.map( (choice, i, arr) => {
                                        return Object.assign( {}, {choice:arr[i], value:tertiaryResponse.numbervalue[i]})
                                    })
                                } else tertiarychoices = []
                                messengeradl3 = Object.assign({},messengeradl2, { tertiary:{
                                    explain:tertiaryResponse.choiceexplanation,
                                    choices:tertiarychoices,
                                    selected: -1,
                                    timeStamp: null
                                }})
                                adlList.push(messengeradl3)
                                if (adlList.length === array.length){
                                    res.status(200).send(adlList)  
                                }
                            });
                        });
                });   
            })
        })
    },
    getadlChoices: (req, res, next) => {    }
}