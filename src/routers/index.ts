import { Application } from 'express'

import * as authors from './authors'

export class Routers {
  constructor(app: Application) {
    app.use('/authors', authors.default)
  }
}