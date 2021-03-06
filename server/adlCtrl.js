

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
                    messengeradl = Object.assign({}, 
                        {
                            explanation:adl.explanation,
                            id:adl.id,
                            name:adl.name,
                            
                        }, 
                        { primary:{
                            explain:primaryResponse.choiceexplanation,
                            choices:primarychoices,
                            selected: -1,
                            timeStamp: null
                            }
                    })
                        req.app.get('db').get_secondary([adl.id]).then( choiceResponse => {
                            secondaryResponse = Object.assign({}, choiceResponse[0])
                            if (secondaryResponse.choices){
                                secondarychoices = secondaryResponse.choices.map( (choice, i, arr) => {
                                    return Object.assign( {}, {choice:arr[i], value:secondaryResponse.numbervalue[i]})
                                })
                            } else {
                                secondarychoices = [], 
                                secondaryResponse.choiceexplanation = '', 
                                secondaryResponse.secondarychoice = 0}
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
                                } else {
                                    tertiarychoices = [], 
                                    tertiaryResponse.choiceexplanation = '',
                                    tertiaryResponse}
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
    postadl: (req, res, next) => {  
        const { residentID, adlID, primaryChoice, primaryExplain, 
            secondaryChoice, secondaryExplain, tertiaryChoice, tertiaryExplain,
            userID, timeStamp} = req.body.adlObj;

        req.app.get('db').add_adl_choice([residentID, userID, adlID, primaryChoice, primaryExplain, secondaryChoice, secondaryExplain, tertiaryChoice, tertiaryExplain])
            .then( id =>
            res.status(200).send(id))
      },
    patchadl: (req, res, next) => {
        const { primaryChoice, primaryExplain, 
            secondaryChoice, secondaryExplain, tertiaryChoice, tertiaryExplain,
            userID, timeStamp, saveID} = req.body.adlObj;

        req.app.get('db').patch_adl_choice([primaryChoice, primaryExplain, secondaryChoice, secondaryExplain,
        tertiaryChoice, tertiaryExplain, userID, saveID])
        .then( id =>
        res.status(200).send(id))
    },
    deleteadl: (req, res, next) => {
        const { deleteID } = req.query;
        
        req.app.get('db').delete_adl_choice([deleteID])
        .then( () => res.sendStatus(200))
    }

}