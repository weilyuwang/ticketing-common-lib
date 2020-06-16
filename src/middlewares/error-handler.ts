import { Request, Response, NextFunction } from "express";
import { CustomError } from "../errors/custom-error";

export const errorHandlerMiddleware = (
    err: Error,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    if (err instanceof CustomError) {
        res.status(err.statusCode).send({ errors: err.serializeErrors() });
        return;
    }

    // if not one of the pre-defined errors, i.e. if some unpredicted error occurs, log the error
    console.log(err);

    res.status(400).send({
        errors: [{ message: "Something went wrong" }],
    });
};
