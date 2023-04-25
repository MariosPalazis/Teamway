import React, {useEffect, useState} from 'react'
import axios from 'axios';
import data from './data.json';
import SingleQuestion from '../Components/SingleQuestion';
import { QuestionsType } from '../interfaces/Questions';
import Button from '@mui/material/Button';
import { Dispatch } from "redux";
import { useDispatch , useSelector , shallowEqual } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { addUser } from '../store/actionCreators';


type GetUsersResponse = {
  name: string;
  points: number;
};


function Questions() {

  const[questions, setQuestions] = useState<QuestionsType[]>([]);
  const[points, setPoints] = useState<number>(0);
  const[questionNumber, setQuestionNumber] = useState<number>(0);
  const[continueButton, setContinueButton] = useState<boolean>(false);
  const[keeppoints, setKeepPoints] = useState<number>(-1);

  const name:string = useSelector(
    (state: IUser) => state.name,
    shallowEqual
  )
  const navigate = useNavigate()
  const dispatch: Dispatch<any> = useDispatch();


  useEffect(()=>{
    const loadData = async() =>{
      //const { data, status } = await axios.get<GetUsersResponse | string>("https://localhost:9000/users", {name: name});
      setQuestions(data)
    }
    loadData();
  },[])

  const saveUser = React.useCallback(
    (user: IUser) => dispatch(addUser(user)),
    [dispatch]
)

  const nextClick = async() =>{
    setContinueButton(false);
    if(questionNumber+1===questions.length){
      try{
        const { status } = await axios.post<GetUsersResponse | string>("http://localhost:9000/users", {name: name, points: points});
        if (status!==200) return navigate("/");
      }catch(err){
        return navigate("/");
      }
      saveUser({name: name, points:points+keeppoints})
      return navigate("/results");
    }else{
      setPoints(points+keeppoints);
      setQuestionNumber(questionNumber+1)
    }
    
  }
  if(questions.length===0){
    return <></>;
  }
  if(name===""){
    return navigate("/");
  }
  return (
    <div className='App'>
      <div className='questionsPanel'>
        <h2>{name} answer all the questions to get a result!</h2>
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