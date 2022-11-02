import React from 'react'
import { useHistory } from 'react-router-dom'
import UserSevice from '../API/UserService'
import { useFetching } from '../hooks/useFetching'
import classes from './css/usersList.module.css'
import MyButton from './UI/button/MyButton'

const UserItem = ({ user, callback }) => {
    const router = useHistory();
    const [deleteUser] = useFetching(async (id) => {
        const response = await UserSevice.deleteUser(id);
        if (response.data.resp === "Deleted") {
            callback()
        }
    });
    return (
        <div className={classes.user}>
            <h4 className={classes.userLink} onClick={() => { router.push("/user/" + user.id) }}>Login: {user.login}</h4>
            <h4>Role: {user.role}</h4>
            <h4>Rating: {user.rating}</h4>
            <MyButton onClick={() => { deleteUser(user.id) }}>Delete</MyButton>
        </div>
    )
}

export default UserItem