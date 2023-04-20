import { useState } from 'react'
import '../App.css'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import axios from 'axios';
import { Navigate} from "react-router-dom";

interface LandingProps {
    
}
type GetUsersResponse = {
    name: string;
    points: number;
};

const Landing = () => {

    const [name, setName]  = useState<string>("");
    const [active, setActive]  = useState<boolean>(false);
    const [error, setError]  = useState<boolean>(false);

    const changeText = (event: React.ChangeEvent<HTMLInputElement> ) =>{
        setName(event.target.value);
        if(event.target.value === ""){
            setActive(false);
        }else{
            setActive(true);
        }
    }

    const continueButton = async (event: React.MouseEvent<HTMLElement>) => {
        try{
            setError(false);
            const { data, status } = await axios.post<GetUsersResponse | string>("https://localhost:9000/users", {name: name});
            if(status !== 200){
                setError(true);
            }else{
                if(typeof data === "string"){
                    return <Navigate to="/questions" />;
                }else{
                    return <Navigate to="/results" />;
                }
            }
        }catch(err){
            setError(true);
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
                {error && <span className='error'>Server Error</span>}
            </div>
        </div>
    );
};

export default Landing;