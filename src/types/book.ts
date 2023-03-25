import { IPublisher } from './publisher'

export interface IBook {
  book_id: number
  title: string
  cover_source: string
  pages: number
  publication_date: string
  publisher_id: IPublisher['publisher_id']
}

export type IBookMin = Omit<IBook, 'pages' | 'publication_date' | 'publisher_id'>