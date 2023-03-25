import { Server } from './server'

const server = new Server()
server.setMiddlewares()
server.setRoutes()
server.start()