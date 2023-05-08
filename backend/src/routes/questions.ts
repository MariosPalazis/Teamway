import { request, Request, Response, Router } from 'express';
import questionsModel from '../models/Questions'
import * as dotenv from "dotenv";
import {IQuestion} from '../interfaces/schemas';
import { getQuestions } from '../controllers/api';


dotenv.config();

const questionsRoute = Router();

questionsRoute.get('/', getQuestions);

export {questionsRoute};