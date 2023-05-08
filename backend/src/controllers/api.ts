import { request, Request, Response, Router } from 'express';
import {IQuestion} from '../interfaces/schemas';
import {IUsers} from '../interfaces/schemas';
import usersModel from '../models/Users'
import questionsModel from '../models/Questions'


export const getQuestions = async (req: Request, res: Response): Promise<any> => {
    try{
        const questions: Array<IQuestion> = await questionsModel.find({});
        return res.status(200).send(questions);
    }catch(err){
        return res.status(500).send({response:"Server Error"});
    }
}


export const postUsers = async (req: Request, res: Response): Promise<any> => {
    if(typeof req.body.name == "undefined") return res.status(400).send("No name provided");

    try{
        let user: IUsers | null = await usersModel.findOne({name: req.body.name});
        if(user === null){

            if(typeof req.body.points == "undefined") return res.status(200).send("No user found");

            const users = new usersModel({
                name: req.body.name,
                points: parseInt(req.body.points),
            });
            user = await users.save();
        }
        return res.status(200).send(user);
    }catch(err){
        return res.status(500).send({response:"Server Error!"});
    }
}