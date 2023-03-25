import type { Request, Response } from 'express'

import { connection } from '../../database/database'
import { IUserReviewBook } from '../../types/user'
import { response } from '../../utils/response'

export async function findBookReview(book_id: number): Promise<IUserReviewBook[]> {
  const query = `
      select *
      from users_review_books urb 
      where book_id = ?
    `
  const [data] = await connection.execute(query, [book_id])
  await connection.end()
  return (data as any) as IUserReviewBook[]
}

export async function router(req: Request, res: Response) {
  try {
    const { book_id } = req.params
    const data = await findBookReview(parseInt(book_id))
    return response<IUserReviewBook[]>(res, data)
  } catch (error: any) {
    return response<string>(res, error?.message, 500)
  }
}