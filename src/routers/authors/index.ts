import { Router } from 'express'

import * as findAllBooksByAuthor from './findAllBooksByAuthor'
import * as findAuthorName from './findAuthorName'
import * as findAuthors from './findAuthors'

const router = Router()

router.post('/findAuthors', findAuthors.router)
router.post('/findAuthorName/:author_id', findAuthorName.router)
router.post('/findAllBooksByAuthor/:author_id', findAllBooksByAuthor.router)

export default router