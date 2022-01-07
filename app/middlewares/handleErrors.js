import { GeneralError } from "../utils/errors";

export const handleErrors = async(err, req, res, next) => {
    let code = 500;
    if (err instanceof GeneralError) {
        code = err.getCode()
    }

    let correlationId = req.headers['x-correlation-id']

    // we don't know any known error if we come into this point
    return res.status(code).json({
        correlationId,
        message: err.message
    })
}