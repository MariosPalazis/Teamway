import { ActionType } from "../action-types/index"
import { Action } from "../action";
import { userData } from "../action-creators";

const initialState = {
    name: ""
}


const reducer = (state: userData = initialState, action: Action) => {
    switch (action.type){
        case ActionType.WRITEUSER:
            return action.payload;
        default:
            return state
    }
};

export default reducer