import type { Request, Response } from 'express'

import { connection } from '../../database/database'
import { response } from '../../utils/response'
import { ICategory } from './../../types/category'


export async function findBookGenre(book_id: number): Promise<ICategory> {
  const query = `
    select distinct g.category_name, g.category_id
    from categories g 
    join books_have_genres bhg ON g.category_id = bhg.category_id 
    where bhg.book_id = ?
  `
  const [data] = await connection.execute(query, [book_id])
  await connection.end()
  return (data as any) as ICategory
}

export async function router(req: Request, res: Response) {
  try {
    const { book_id } = req.params
    const data = await findBookGenre(parseInt(book_id))
    return response<ICategory>(res, data)
  } catch (error: any) {
    return response<string>(res, error?.message, 500)
  }
}