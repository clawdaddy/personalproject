
module.exports = {
    getResidents: (req, res, next) => {
        const { group, id } = req.body;
        req.app.get('db').get_residents([group, id])
        .then( residents => {
            res.status(200).send( residents )
        })
        .catch( () => res.sendStatus(500))
    },

    getFacility: (req, res, next) => {
        const { facility } = req.params;
        req.app.get('db').get_facility([facility])
        .then( facilityObj => {
            res.status(200).send( facilityObj )
        })
        .catch( () => res.status(500))
    }
}