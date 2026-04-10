import type { NextFunction, Request, Response } from "express";

type errorProps = {
	details: string
	message: string
}

export class ErrorHandler extends Error {
	constructor(
		public statusCode: number,
		public info: errorProps,
	) {
		super()
		this.name = "ErrorHandler"
	}
}

export const handleError = (
	error: ErrorHandler,
	_req: Request,
	res: Response,
	_next: NextFunction,
) => {
	if (error instanceof ErrorHandler) {
		return res.status(error.statusCode).json(error.info)
	}
}