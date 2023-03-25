import type { Request, Response } from 'express'

import { connection } from '../../database/database'
import { response } from '../../utils/response'
import { IBook } from './../../types/book'

export async function findBookAvgRating(book_id: number): Promise<IBook> {
  const query = `
    select avg(rating) as avg_rating
    from users_review_books urb 
    where book_id = ?
  `
  const [data] = await connection.execute(query, [book_id])
  await connection.end()
  return (data as any) as IBook
}

export async function router(req: Request, res: Response) {
  try {
    const { book_id } = req.params
    const data = await findBookAvgRating(parseInt(book_id))
    return response<IBook>(res, data)
  } catch (error: any) {
    return response<string>(res, error?.message, 500)
  }
}