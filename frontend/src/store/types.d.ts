interface IUser {
    name: string
    points?: number
}
  
type UserAction = {
    type: string
    user: IUser
}

type DispatchType = (args: UserAction) => UserAction