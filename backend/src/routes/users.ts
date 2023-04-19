import { request, Request, Response, Router } from 'express';
import usersModel from '../models/Users'
import * as dotenv from "dotenv";
import {IUsers} from '../interfaces/schemas';


dotenv.config();

export const userRoute = Router();

userRoute.post('/', async (req: Request, res: Response): Promise<any> => { 

    if(typeof req.body.name == "undefined") return res.status(400).send("No name provided");

    try{
        let user: IUsers | null = await usersModel.findOne({name: req.body.name});
        if(user === null){

            if(typeof req.body.points == "undefined") return res.status(400).send("No points provided");

            const users = new usersModel({
                name: req.body.name,
                points: parseInt(req.body.points),
            });
            user = await users.save();
        }
        res.status(200).send(user);
    }catch(err){
        res.status(500).send({response:"Server Error"});
    }

});
