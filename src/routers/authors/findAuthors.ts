import type { Request, Response } from 'express'

import { connection } from '../../database/database'
import { IAuthor } from '../../types/author'
import { response } from '../../utils/response'


export default async function findAuthors(): Promise<IAuthor[]> {
  const query = `
    select author_id, author_name 
    from authors a
    order by author_id
  `
  const [data] = await connection.execute(query, [])
  await connection.end()
  return (data as any) as IAuthor[]
}

export async function router(_req: Request, res: Response) {
  const data = await findAuthors()
  return response<IAuthor[]>(res, data)
}