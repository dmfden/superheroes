const MAXLIMIT = 25;

module.exports = async (req, res, next) => {
    try {
        const {query: {limit, offset}} = req;

        if (!limit && !offset) {
            req.pagination = {
                limit: 5,
                offset: 0
            };
        } else {
            req.pagination = {
                limit: limit > MAXLIMIT || limit <= 0 ? MAXLIMIT : limit,
                offset: offset < 0 ? 0 : offset
            }
        }

        next();
    } catch (err) {
        next(err);
    }
}