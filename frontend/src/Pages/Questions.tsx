import React, {useEffect, useState} from 'react'
import axios from 'axios';
import data from './data.json';
import SingleQuestion from '../Components/SingleQuestion';
import { QuestionsType } from '../interfaces/Questions';
import Button from '@mui/material/Button';

function Questions() {

  const[questions, setQuestions] = useState<QuestionsType[]>([]);
  const[points, setPoints] = useState<number>(0);
  const[questionNumber, setQuestionNumber] = useState<number>(0);
  const[continueButton, setContinueButton] = useState<boolean>(false);
  const[keeppoints, setKeepPoints] = useState<number>(-1);

  useEffect(()=>{
    const loadData = async() =>{
      //const { data, status } = await axios.get<GetUsersResponse | string>("https://localhost:9000/users", {name: name});
      console.log(data)
      setQuestions(data)
    }
    loadData();
  },[])

  const nextClick = async() =>{
    setPoints(points+keeppoints);
    setContinueButton(false);
    setQuestionNumber(questionNumber+1)
  }
  if(questions.length===0){
    return <></>;
  }
 
  console.log(questionNumber, questions.length)
  return (
    <div className='App'>
      <div className='questionsPanel'>
        <h2>Answer all the questions to get a result!</h2>
        {questions.length>0 && <SingleQuestion questionsLength={questions?.length} questionNumber={questionNumber} questionData={questions[questionNumber]} setContinueButton={setContinueButton}  setKeepPoints={setKeepPoints}/>}
        {
          continueButton
          ?<Button variant="outlined" color="success" className='questionButton' onClick={nextClick} >{questionNumber+1===questions.length?"See Results":"Next Question"}</Button>
          :<Button variant="outlined" className='questionButton' disabled>{questionNumber+1===questions.length?"See Results":"Next Question"}</Button>
        }
      </div>
    </div>
   
  )
}

export default Questions