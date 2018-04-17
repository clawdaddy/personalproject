
module.exports = {
    getResidents: (req, res, next) => {
        
    },
    getFacility: (req, res, next) => {
        const { facility } = req.params;
        console.log(facility)

        req.app.get('db').get_facility([facility])
        .then( facilityObj => {
            console.log(facilityObj)
            res.status(200).send( facilityObj )
            
        }).catch( () => res.status(500))
    }
}