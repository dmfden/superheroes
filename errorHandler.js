const {ValidationError, DatabaseError, ForeignKeyConstraintError} = require('sequelize');
const NotFoundError = require('./errors/NotFoundError');

module.exports.errorHandler = async (err, req, res, next) => {
    if(err instanceof ForeignKeyConstraintError) {
        return res.status(400).send({errors: {
            message: err.message
        }})
    }

   if(err instanceof ValidationError) {
         return res.status(400).send({errors: {
                message: err.message
            }})
   }

   if (err instanceof DatabaseError) {
    return res.status(500).send({
        errors: {
            message: err.message
        }
    })
   }

   if (err instanceof NotFoundError) {
    return res.status(404).send({errors: {
        message: err.message
    }})
   }

   res.status(500).send(err);


} 