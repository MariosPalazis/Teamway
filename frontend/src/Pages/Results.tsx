import React from 'react'
import { useSelector , shallowEqual } from "react-redux";
import kid from "../assets/kid.gif";
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';

function Results() {
  const navigate = useNavigate()

  const user: string = useSelector(
    (state: IUser) => state.name,
    shallowEqual
  )
  const points: number = useSelector(
    (state: IUser) => state.points,
    shallowEqual
  ) || 0

  const bringResults = (points: number ) => {
    let result = "Introvert";
    if(points>37.5){
      result = "Extrovert"
    }
    return result;
  }

  return (
    <div className='App'>
      <div className='resultsPanel'>
        <h2>{user} here are your results!</h2>
        <div className='resultsImage'>
          <img src={kid}/>
        </div>
        <h3>You are {bringResults(points)}!!!</h3>
        <Button variant="outlined" color="secondary" style={{marginTop:10}} className='questionButton' onClick={()=>(navigate("/"))} >Close</Button>
      </div>
    </div>
  )
}

export default Results