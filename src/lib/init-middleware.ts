export default function initMiddleware(
  middleware: (
    req: Request,
    res: Response,
    next: (result?: Error | unknown) => void
  ) => void
) {
  return (req: Request, res: Response) =>
    new Promise<void>((resolve, reject) => {
      middleware(req, res, (result?: Error | unknown) => {
        if (result instanceof Error) {
          return reject(result)
        }
        return resolve()
      })
    })
}
