import React, { Dispatch, SetStateAction ,useEffect,useState} from 'react'
import { QuestionsType } from '../interfaces/Questions';


interface SingleQuestionProps {
  questionsLength: number;
  questionData: QuestionsType;
  setKeepPoints: Dispatch<SetStateAction<number>>;
  setContinueButton: Dispatch<SetStateAction<boolean>>;
  questionNumber: number;
}
function SingleQuestion(props: SingleQuestionProps) {
  

  const[selected, setSelected] = useState<number>(-1)

  useEffect(()=>{
    setSelected(-1)
  },[props.questionNumber])

  const clickAnswer = async (points:number, selected:number) => {
    props.setKeepPoints(points);
    setSelected(selected);
    props.setContinueButton(true);
  }

  return (
    <div className='questionPanel'>
      <h3>Question {props.questionNumber+1}/{ props.questionsLength}</h3>
      <div className='questionBox'>
        <div className='question'>{props.questionData.question}</div>
        <div className='answers'>
          {
            props.questionData?.answers.map((item, key)=>{
              if(selected === key){
                return <div key={key} className='singleAnswer selected' onClick={() => clickAnswer(item.points, key)} >{item.text}</div>
              }else{
                return <div key={key} className='singleAnswer' onClick={() => clickAnswer(item.points, key)} >{item.text}</div>
              }
            })
          }
        </div>
      </div>
    </div>
  )
}

export default SingleQuestion
