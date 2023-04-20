import { Dispatch } from "redux"
import { ActionType } from "../action-types"
import { Action } from "../action/index"


export type userData = {
    name:string;
    points?: number;
}
export const writeUser = (userData: userData) => {
    return (dispatch: Dispatch<Action>) => {
        dispatch({
            type: ActionType.WRITEUSER,
            payload: userData
        })
    }
}

