import type { Request, Response } from 'express'

import { connection } from '../../database/database'
import { IPublisher } from '../../types/publisher'
import { response } from '../../utils/response'

export async function findBookPublisher(book_id: number): Promise<IPublisher> {
  const query = `
    select publisher_name, publisher_id
    from publishers p
    join books b on b.publisher_id = p.publisher_id
    where b.book_id = ?
  `
  const [data] = await connection.execute(query, [book_id])
  await connection.end()
  return (data as any)[0] as IPublisher
}

export async function router(req: Request, res: Response) {
  try {
    const { book_id } = req.params
    const data = await findBookPublisher(parseInt(book_id))
    return response<IPublisher>(res, data)
  } catch (error: any) {
    return response<string>(res, error?.message, 500)
  }
}