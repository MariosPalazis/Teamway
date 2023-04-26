import { request, Request, Response, Router } from 'express';
import questionsModel from '../models/Questions'
import * as dotenv from "dotenv";
import {IQuestion} from '../interfaces/schemas';


dotenv.config();

const questionsRoute = Router();

questionsRoute.get('/', async (req: Request, res: Response): Promise<any> => { 
    try{
        const questions: Array<IQuestion> = await questionsModel.find({});
        res.status(200).send(questions);
    }catch(err){
        res.status(500).send({response:"Server Error"});
    }

});

export {questionsRoute};