export interface User{
  uid:string
  FriendshipRequest:string[]
  Friends:Friends[]
  displayName:string
  IsActive:boolean
  photoURL:string
}
interface Friends{
uid:string
roomId:string
}
