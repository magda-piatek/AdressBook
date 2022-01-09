import {NextFunction, Response, Request} from 'express'

type TValidationError = {
  [key: string]: string
}

export default (resourceSchema: any) =>
  async (req: Request, res: Response, next: NextFunction) => {
    const resource = req.body

    try {
      await resourceSchema.validate(resource, {abortEarly: false})
      next()
    } catch (err: any) {
      const validationErrors: TValidationError = {}

      err.inner.forEach((error: TValidationError) => {
        if (error.path) {
          validationErrors[error.path as string] = error.message
        }
      })

      res.status(400).json({error: validationErrors})
    }
  }
