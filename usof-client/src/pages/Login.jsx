import React from 'react'
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import UserSevice from '../API/UserService';
import MyButton from '../components/UI/button/MyButton';
import MyInput from '../components/UI/input/MyInput';
import { useFetching } from '../hooks/useFetching';
import jwt from 'jwt-decode';
import { useHistory } from 'react-router-dom';


const Login = () => {
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();
    const isAuth = useSelector(state => state.status);
    const [apiError, setApiError] = useState('');
    const router = useHistory();
    

    const [fetchLogin, isUserLoading, userError] = useFetching(async () => {
        try{
            let response = await UserSevice.login(login, password);
            if(response.data.token){
                let token = response.data.token; 
                localStorage.setItem('token', token);
                let user = jwt(token);
                localStorage.setItem('user', user);
                dispatch({type: "LOGIN", payload: user});
    
            }
        }
        catch(err){
            if(err.response.data.message === "NOT FOUND"){
                setApiError("User not found");
            }
            else{
                setApiError(err.response.data.message);
            }
            
        }


    })
    function apiLogin(e){
        e.preventDefault();
        fetchLogin();
        
    }

    return (
        <div>
            <h1>Login </h1>
            <form>
                <MyInput
                    value={login}
                    type="text"
                    onChange={e => setLogin(e.target.value)}
                    placeholder="Login"
                />
                <MyInput
                    value={password}
                    type="password"
                    onChange={e => setPassword(e.target.value)}
                    placeholder="Password"
                />
                <h3>{apiError}</h3>
                <MyButton onClick={(e) => apiLogin(e)}>Login</MyButton>
                <MyButton style={{marginLeft: 4}} onClick={() => router.push("/register")}>Register</MyButton>
            </form>
        </div>
    )
}

export default Login