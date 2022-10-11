const auth = (req, res, next) => {
    try {
        if (req.session.userId) {
            next(); 
        } else {
            res.status(401).json({ "msg": "access denied" })
        }
    } catch (e) {
        console.log(e)
        res.status(500).json({"msg": "server error"})
    }
}

module.exports = auth; 
