import express from 'express';
import * as mongoose from 'mongoose'
import * as dotenv from "dotenv";
import { MongooseOptions } from './interfacesMain';
import {userRoute} from './routes/users';
import {questionsRoute} from './routes/questions';
import bodyParser from 'body-parser';
import {IQuestion} from './interfaces/schemas';
import questionModel from './models/Questions';



dotenv.config();
const app = express()

app.use(bodyParser.json({ limit: '50mb', type: 'application/json' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

const PORT = 9000

app.get('/', (req: express.Request, res: express.Response) => {
    res.setHeader('Content-Type', 'text/html')
    res.end('<h1>Hello World</h1>')
})

app.use('/users', userRoute);
app.use('/questions', questionsRoute);


const url:any = process.env.DB_CONNECT;
const options: MongooseOptions = {
    useNewUrlParser : true,
    useUnifiedTopology: true,
    dbName: 'Teamway',
}
mongoose.connect(url, options)
  .then( async () => {
    console.log('Connected to the Database.');
    try{
        const questions: Array<IQuestion> = await questionModel.find({});
        if(questions.length === 0){
            await questionModel.insertMany([
              {
                question: "You’re really busy at work and a colleague is telling you their life story and personal woes. You:",
                answers: [
                    {
                        text:"Don’t dare to interrupt them",
                        points: 0
                    },
                    {
                        text:"Think it’s more important to give them some of your time; work can wait",
                        points: 5
                    },
                    {
                        text:"Listen, but with only with half an ear",
                        points: 10
                    },
                    {
                        text:"Interrupt and explain that you are really busy at the moment",
                        points: 15
                    },
                ]
              },
              {
                question: "You’ve been sitting in the doctor’s waiting room for more than 25 minutes. You:",
                answers: [
                    {
                        text:"Look at your watch every two minutes",
                        points: 0
                    },
                    {
                        text:"Bubble with inner anger, but keep quiet",
                        points: 5
                    },
                    {
                        text:"Explain to other equally impatient people in the room that the doctor is always running late",
                        points: 10
                    },
                    {
                        text:"Complain in a loud voice, while tapping your foot impatiently",
                        points: 15
                    },
                ]
              },
              {
                question: "You’re having an animated discussion with a colleague regarding a project that you’re in charge of. You:",
                answers: [
                    {
                        text:"Don’t dare contradict them",
                        points: 0
                    },
                    {
                        text:"Think that they are obviously right",
                        points: 5
                    },
                    {
                        text:"Defend your own point of view, tooth and nail",
                        points: 10
                    },
                    {
                        text:"Continuously interrupt your colleague",
                        points: 15
                    },
                ]
              },
              {
                question: "You are taking part in a guided tour of a museum. You",
                answers: [
                    {
                        text:"Are a bit too far towards the back so don’t really hear what the guide is saying",
                        points: 0
                    },
                    {
                        text:"Follow the group without question",
                        points: 5
                    },
                    {
                        text:"Make sure that everyone is able to hear properly",
                        points: 10
                    },
                    {
                        text:"Are right up the front, adding your own comments in a loud voice",
                        points: 15
                    },
                ]
              },
              {
                question: "During dinner parties at your home, you have a hard time with people who:",
                answers: [
                    {
                        text:"Ask you to tell a story in front of everyone else",
                        points: 0
                    },
                    {
                        text:"Talk privately between themselves",
                        points: 5
                    },
                    {
                        text:"Hang around you all evening",
                        points: 10
                    },
                    {
                        text:"Always drag the conversation back to themselves",
                        points: 15
                    },
                ]
              },
            ])
          }
    }catch(err){
    }
  })
  .catch(err => console.error(err));


app.listen(PORT, () => console.log(`app running on port ${PORT}`))