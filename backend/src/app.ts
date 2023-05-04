
import express from 'express';
import {userRoute} from './routes/users';
import {questionsRoute} from './routes/questions';
import bodyParser from 'body-parser';
import * as dotenv from "dotenv";

dotenv.config();
const app = express()


app.use(bodyParser.json({ limit: '50mb', type: 'application/json' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

app.use('/api/users', userRoute);
app.use('/api/questions', questionsRoute);

app.get('/',(req, res)=>{
    return res.status(200)
})


export default app;