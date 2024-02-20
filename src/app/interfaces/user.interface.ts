export interface User{
  uid:string
  FriendshipRequest:Request[]
  Friends:Record<string,string>
  displayName:string
  IsActive:boolean
  photoURL:string
}
export interface Request{
  EmmiterId:string
    ReceptorId:string
    DateSent?:Date
}
