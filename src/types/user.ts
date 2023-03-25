import {IBook} from './book'

export interface IUser {
  user_id: number
  username: string
  password: string
  birthday: string
  nationality: string
}

export interface IUserReviewBook {
  ub_id: number
  username: IUser['user_id']
  book_id: IBook['book_id']
  rating: number
  comment: string
}