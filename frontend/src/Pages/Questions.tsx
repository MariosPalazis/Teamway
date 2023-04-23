import React, {useEffect, useState} from 'react'
import axios from 'axios';
import data from './data.json';
import SingleQuestion from '../Components/SingleQuestion';
import { QuestionsType } from '../interfaces/Questions';

function Questions() {

  const[questions, setQuestions] = useState<QuestionsType[]>();
  const[points, setPoints] = useState<number>();
  const[questionNumber, setQuestionNumber] = useState<number>(0);

  useEffect(()=>{
    const loadData = async() =>{
      //const { data, status } = await axios.get<GetUsersResponse | string>("https://localhost:9000/users", {name: name});
      console.log(data)
      setQuestions(data)
    }
    loadData();
  },[])

 
  return (
    <div className='App'>
      <div className='questionsPanel'>
        <h2>Answer all the questions to get a result!</h2>
        <SingleQuestion questionsLength={questions?.length} questionData={questions[questionNumber]} setPoints={setPoints} />
        
      </div>
    </div>
   
  )
}

export default Questions