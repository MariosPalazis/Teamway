import React, { useState } from 'react'
import '../App.css'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Dispatch } from "redux"
import { addUser } from '../store/actionCreators';
import {  useDispatch } from "react-redux"

interface LandingProps {
    
}
type GetUsersResponse = {
    name: string;
    points: number;
};

const Landing = () => {
    const navigate = useNavigate()

    const [name, setName]  = useState<string>("");
    const [active, setActive]  = useState<boolean>(false);
    const [error, setError]  = useState<string>("");


    const dispatch: Dispatch<any> = useDispatch()


    const changeText = (event: React.ChangeEvent<HTMLInputElement> ) =>{
        setName(event.target.value);
        if(event.target.value === ""){
            setActive(false);
        }else{
            setActive(true);
        }
    }
    const saveUser = React.useCallback(
        (user: IUser) => dispatch(addUser(user)),
        [dispatch]
    )

    const continueButton = async (event: React.MouseEvent<HTMLElement>) => {
        try{
            setError("");
            const { data, status } = await axios.post<GetUsersResponse | string>("http://localhost:9000/api/users", {name: name});
            if(status !== 200){
                setError("Server Error");
            }else{
                if(typeof data === "string"){
                    saveUser({name: name});
                    return navigate("/questions");
                }else{
                    saveUser({name: data.name, points: data.points});
                    return navigate("/results");
                }
            }
        }catch(err){
            setError("Server Error");
        }
    }

    return (
        <div className="App">
            <div className='panelBox'>
                <h2>This is a simple personality test!</h2>
                <span>Enter your name below to start it!</span>
                <TextField id="outlined-basic" label="Your Name" variant="outlined" className='textfield' onChange={changeText}/>
                {
                active ? <Button variant="outlined" color="success" className='proccedButton' onClick={continueButton}>Continue</Button> :  <Button variant="outlined" className='proccedButton' disabled>Continue</Button>
                }
                {error!=="" && <span className='error'>Server Error</span>}
            </div>
        </div>
    );
};

export default Landing;