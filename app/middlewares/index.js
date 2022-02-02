import { BadRequest } from "../utils/errors";
import { GeneralError } from "../utils/errors";

export const handleValidations = (validate) => {
    return (req, res, next) => {
        const result = validate(req.body);
        const isValid = result.error == null;

        if (isValid) {
        return next();
        }
        const { details } = result.error;
        const messages = details.map((e) => e.message);
        const msg = messages.join(",");
        throw new BadRequest(msg)
    };
};

export const processRequest = (req, res, next) => {
    let correlationId = req.headers["x-correlation-id"];
  
    if (!correlationId) {
      correlationId = Date.now().toString();
      req.headers["x-correlation-id"] = correlationId;
    }
  
    res.set("x-correlation-id", correlationId);
    return next();
  };

  

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