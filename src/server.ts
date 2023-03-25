import 'dotenv/config'

import cors from 'cors'
import express from 'express'
import helmet from 'helmet'
import morgan from 'morgan'

import { Routers } from './routers'

export class Server {

  private app: express.Application
  private PORT = process.env.PORT ?? 3000

  constructor() {
    this.app = express()
  }

  public start(): void {
    this.app.listen(this.PORT, () => {
      console.log('Server started on port ' + this.PORT)
    })
  }

  public setMiddlewares(): void {
    this.app.use(express.json())
    this.app.use(express.urlencoded({ extended: true }))
    this.app.use(cors({
      origin: '*',
      methods: ['GET', 'POST', 'PUT', 'DELETE']
    }))
    this.app.use(morgan('dev'))
    this.app.use(helmet())
  }

  public setRoutes(): void {
    new Routers(this.app)
  }

}