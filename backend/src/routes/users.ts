import { request, Request, Response, Router } from 'express';
import usersModel from '../models/Users'
import * as dotenv from "dotenv";
import {IUsers} from '../interfaces/schemas';
import { postUsers } from '../controllers/api';

dotenv.config();

const userRoute = Router();

userRoute.post('/', postUsers);

export {userRoute};