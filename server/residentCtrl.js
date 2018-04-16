
module.exports = {
    getResidents: (req, res, next) => {
        
    },
    getFacility: (req, res, next) => {
        req.app.get('db').facility().then( (facilityNames) => {
            res.status(200).send(facilityNames)
            .catch( () => res.status(500))
        })
    }
}