import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import UserSevice from '../API/UserService';
import MyInput from '../components/UI/input/MyInput';
import { useFetching } from '../hooks/useFetching';
import MyButton from './UI/button/MyButton';


const UserForm = ({ userData, fetchFunc, callback, actionTitle }) => {
    const isAuth = useSelector(state => state);
    const [login, setLogin] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [fullName, setFullName] = useState('');
    const [message, setMesage] = useState('');
    const [user, setUser] = useState({});


    const [fetchUser, isUserLoading, userError] = useFetching(async () => {
        let response = await UserSevice.getUserById(isAuth.user.id);
        setLogin(response.data.user[0].login);
        setEmail(isAuth.user.email);
        setPassword(response.data.user[0].password);
        setFullName(response.data.user[0].fullName);
        setUser(response.data.user[0]);
      });

    useEffect(() => {
        if(actionTitle === "Edit"){
            fetchUser();
        }
    }, [])
    const sendReqReg = (e) => {
        console.log("registration...")
        e.preventDefault();
        if (login, email, password, fullName) {
            const User = {
                login: login,
                email: email,
                password: password,
                fullName: fullName
            }
            fetchFunc(User, setLogin, setEmail, setPassword, setFullName, setMesage);
        }
        else {
            setMesage("Fill all fields pls");
            return;
        }
    }
    const sendReqEdit = (e) => {
        console.log("edit...")
        e.preventDefault();
        if (login, email, password, fullName) {
            const User = {
                login: login,
                email: email,
                password: password,
                fullName: fullName,
                role: user.role,
                rating: user.rating
            }
            fetchFunc(isAuth.user.id, User, setLogin, setEmail, setPassword, setFullName, setMesage);
        }
    }
    if (actionTitle === "Register") {
        return (
            <div>
                <h1>{actionTitle}</h1>

                <MyInput
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    type="text"
                    placeholder="email"
                />
                <MyInput
                    value={login}
                    onChange={e => setLogin(e.target.value)}
                    type="text"
                    placeholder="login"
                />
                <MyInput
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    type="password"
                    placeholder="Password"
                />
                <MyInput
                    value={fullName}
                    onChange={e => setFullName(e.target.value)}
                    type="text"
                    placeholder="Full Name"
                />
                <h3>{message}</h3>
                <MyButton onClick={e => sendReqReg(e)}>{actionTitle}</MyButton>
            </div>
        )
    }
    else if (actionTitle === "Edit") {
        return (
            // {console.log()}
            <form>
                <h1>{actionTitle}</h1>
                <MyInput
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    type="text"
                    placeholder="email"
                />
                <MyInput
                    value={login}
                    onChange={e => setLogin(e.target.value)}
                    type="text"
                    placeholder="login"
                    disabled
                />
                <MyInput
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    type="password"
                    placeholder="Password"
                    disabled
                />
                <MyInput
                    value={fullName}
                    onChange={e => setFullName(e.target.value)}
                    type="text"
                    placeholder="Full Name"
                />
                <h3>{message}</h3>
                <MyButton onClick={e => sendReqEdit(e)}>{actionTitle}</MyButton>
            </form>
        )
    }

}

export default UserForm