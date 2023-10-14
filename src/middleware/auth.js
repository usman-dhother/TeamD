const jwt = require("../auth");

exports.isValid = (req, res, next) => {
    const token = req.headers.authorization;

    if (!token) {
        return res.status(403).send('Forbidden');
    }

    try {
        const decoded = jwt.verify(token);
        req.user = decoded;
        next();
    } catch (err) {
        res.status(401).send('Unauthorized');
    }
}       