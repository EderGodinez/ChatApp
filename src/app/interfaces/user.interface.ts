import { Message } from "./Message.interface"

export interface User{
  uid:string
  displayName:string
  photoURL:string
  FriendshipRequest:Request[]
  Friends:Friend[]
  IsActive:boolean
}
export interface Request{
  EmmiterId:string
  ReceptorId:string
  DateSent?:Date
}
export interface Friend{
  FriendId:string
  ChatId:string
  Messages:Message[]
}
