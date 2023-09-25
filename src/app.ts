import express, { Application, NextFunction, Request, Response } from 'express'
import cors from 'cors'
const app: Application = express()
import routes from './app/routes'
import httpStatus from 'http-status'
import globalExceptionHandler from './app/middlewares/globalExceptionHandler'

app.use(cors())

// parser
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/api/v1/', routes)

// testing
app.get('/', async (req: Request, res: Response) => {
  res.send('Api Gateway working successfully')
})

// global error handle
app.use(globalExceptionHandler)

// handle not found
app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(httpStatus.NOT_FOUND).json({
    success: false,
    message: 'Data NOt Found',
    errorMessages: [
      {
        path: req.originalUrl,
        message: 'Invalid Api Request',
      },
    ],
  })
  next()
})

export default app
