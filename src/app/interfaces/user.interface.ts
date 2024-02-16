export interface User{
  uid:string
  FriendshipRequest:Request[]
  Friends:Record<string,string>
  displayName:string
  IsActive:boolean
  photoURL:string
}
interface Request{
  userId:string
  DateSent:Date
}
