import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import UserSevice from '../API/UserService';
import UserForm from '../components/UserForm';
import { useFetching } from '../hooks/useFetching';


const Register = () => {
    const router = useHistory();
    const [fetchCreateUser, isCreateUserLoading, CreateUserError] = useFetching(async (User, setLogin, setEmail, setPassword, setFullName, setMesage) => {
        console.log(User);
        try {
            const response = await UserSevice.register(User);
            // console.log(response.data);
            if (response.data.resp === "Created") {
                setLogin('');
                setEmail('');
                setFullName('');
                setPassword('');
                console.log(response.data.resp);
                setMesage(response.data.resp);
                setTimeout(() => {
                    setMesage('');
                    router.push("/login");
                }, 500);
            }
        }
        catch (err) {
            setMesage(err.response.data.message);
            console.log(err.response.data);
        }
    });
    return (
        <div>
            <UserForm fetchFunc={fetchCreateUser} actionTitle={"Register"} />
        </div>
    )
}

export default Register