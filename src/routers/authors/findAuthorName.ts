import type { Request, Response } from 'express'
import { connection } from 'src/database/database'

import { IAuthor } from '../../types/author'
import { response } from '../../utils/response'

export default async function findAuthorName(author_id: number): Promise<IAuthor['author_name']> {
  const query = `
        select distinct author_name 
        from authors a 
        where a.author_id = ?
    `
  const [data] = await connection.execute(query, [author_id])
  await connection.end()
  return (data as any)[0]?.author_name
}

export async function router(req: Request, res: Response) {
  const { author_id } = req.params
  const data = await findAuthorName(parseInt(author_id))
  return response<IAuthor['author_name']>(res, data)
}