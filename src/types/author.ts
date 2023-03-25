import { IBook } from './book'

export interface IAuthor {
  author_id: number
  author_name: string
}

export interface IAuthorWriteBook extends Omit<IAuthor, 'author_name'> {
  ab_id: number
  book_id: IBook['book_id']
}