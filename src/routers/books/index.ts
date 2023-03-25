import type { Request, Response } from 'express'

import { connection } from '../../database/database'
import { IBookMin } from '../../types/book'
import { response } from '../../utils/response'

export async function getBooks(): Promise<IBookMin[]> {
  const query = `
    SELECT book_id, title, cover_source 
    FROM books 
    ORDER BY book_id ASC
  `
  const [data] = await connection.query(query, [])
  await connection.end()
  return (data as any) as IBookMin[]
}

export async function router(_req: Request, res: Response) {
  const data = await getBooks()
  return response<IBookMin[]>(res, data)
}