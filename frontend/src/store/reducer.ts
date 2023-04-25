import * as actionTypes from "./actionTypes"

const initialState: IUser = {
    name: ""
}


const reducer = (
    state: IUser = initialState,
    action: UserAction
  ): IUser => {
    switch (action.type) {
      case actionTypes.ADD_USERNAME:
        let newUser: IUser = {
          name: action.user.name
        }
        if(typeof action.user.points !== "undefined"){
            newUser.points = action.user.points
        }
        return newUser
    }
    return state
  }
  
  export default reducer