export interface IAnswer {
    text: string,
    points: number
}

export interface IQuestion  {
    question: string;
    answers: IAnswer[];
}

export interface IUsers  {
    name: string;
    points?: number;
}
