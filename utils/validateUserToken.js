module.exports = {
    validateToken(req, res, next) {
        const authToken = req.headers['authorization'];
        if (authToken) {
            const ENVTOKEN = process.env.ENVTOKEN
            if (authToken == ENVTOKEN) {
                next();
            } else {
                res.sendStatus(403);    
            }
        } else {
            res.sendStatus(403);
        }
    },
}