import { ActionType } from "../action-types/index"

type userData = {
    name:string;
    points?: number;
}

interface WriteUser {
    type: ActionType.WRITEUSER,
    payload: userData
}

export type Action = WriteUser;