const adlSchema = require('./adlschema');

module.exports = {
    getadlSchema: (req, res, next) => {
        let primaryChoices = null;
        let secondaryChoices = null;
        let tertiaryChoices = null;
        let primaryObject = null;
        let secondaryObject = null;
        let tertiaryObject = null;
        const adlList = adlSchema.list.map( adl => {
            primaryChoices = null;
            secondaryChoices = null;
            tertiaryChoices = null;
            primaryObject = null;
            secondaryObject = null;
            tertiaryObject = null;

            
            primaryChoices = adlSchema.choiceIDs.filter( choice => {
                
                return choice.ID === adl.primary.choicesID
                }
            )
            
            primaryObject = {
                choices:primaryChoices[0].choices,
                explain:adl.primary.explain,
                selected: -1,
                timeStamp: null

            }
            if (adl.secondary){
                secondaryChoices = adlSchema.choiceIDs.filter( choice => {
                    return choice.ID === adl.secondary.choicesID
                })
                secondaryObject = {
                    choices:secondaryChoices[0].choices,
                    explain:adl.secondary.explain,
                    selected: -1,
                    timeStamp: null
                }
        
            }
            if (adl.tertiary){
                tertiaryChoices = adlSchema.choiceIDs.filter( choice => {
                    return choice.ID === adl.tertiary.choicesID
                })
                tertiaryObject = {
                    choices:tertiaryChoices[0].choices,
                    explain:adl.tertiary.explain,
                    selected: -1,
                    timeStamp: null
                }
            } else {
                tertiaryObject = null
            }
            console.log('whole adl: ',adl)
            console.log('adlName: ',adl.ADLName)
            console.log('primary: ',primaryObject)
            console.log( 'secondary: ',secondaryObject)
            console.log('tertiary: ', tertiaryObject)
        return (
            Object.assign({}, adl, { primary:primaryObject, 
            secondary:secondaryObject, tertiary:tertiaryObject })
        )
        })
        res.status(200).send(adlList)
    },
    getadlChoices: (req, res, next) => {    }
}