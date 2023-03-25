import type { Request, Response } from 'express'

import { response } from '../..//utils/response'
import { connection } from '../../database/database'
import { IAuthorWriteBook } from './../../types/author'

export async function findAllBooksByAuthor(author_id: number): Promise<IAuthorWriteBook> {
  const query = `
    select *
    from books b
    join authors_write_books awb on awb.book_id = b.book_id
    where awb.author_id = ?;
  `
  const [data] = await connection.execute(query, [author_id])
  await connection.end()
  return (data as any) as IAuthorWriteBook
}

export async function router(req: Request, res: Response) {
  const { author_id } = req.params
  const data = await findAllBooksByAuthor(parseInt(author_id))
  return response<IAuthorWriteBook>(res, data)
}