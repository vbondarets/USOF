import React, { useEffect } from 'react'
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PostSevice from '../API/PostService';
import UserSevice from '../API/UserService';
import PostList from '../components/PostList';
import MyButton from '../components/UI/button/MyButton';
import Loader from '../components/UI/Loader/Loader';
import MyModal from '../components/UI/MyModal/MyModal';
import UserForm from '../components/UserForm';
import { useFetching } from '../hooks/useFetching';
import classes from './css/User.module.css'

const User = () => {
  const isAuth = useSelector(state => state);
  const [user, setUser] = useState({});
  const [posts, setPosts] = useState([]);
  const [filter, setFilter] = useState({ sort: '', query: '' });
  const [modal, setModal] = useState(false);
  const [userData, setUserData] = useState({});


  const [fetchPosts, isPostLoading, postError] = useFetching(async (id) => {
    let response = await PostSevice.getAll();
    const arr = response.data.posts;
    // console.log(user);
    let authorPosts = [];
    arr.forEach((el, index) => {
      if (el.author_id === id) {
        let string = el.publishDate;
        let stringArr = string.split("T");
        stringArr = stringArr[0].split("-");
        el.publishDate = stringArr.join(" ");
        authorPosts.push(el);
      }
    });
    setPosts(authorPosts);
  });
  const [fetchEditUser, isEditUserLoading, editUserError] = useFetching(async (id, user, setLogin, setEmail, setPassword, setFullName, setMesage) => {
    try {
      const response = await UserSevice.changeUserById(user, id);
      if (response.data.resp === "Changed") {
          setLogin('');
          setEmail('');
          setFullName('');
          setPassword('');
          console.log(response.data.resp);
          setMesage(response.data.resp);
          setTimeout(() => {
              setMesage('');
              fetchUser();
              setModal(false);
          }, 500);
      }
  }
  catch (err) {
      setMesage(err.response.data.message);
      console.log(err.response.data);
  }
    
    
  });

  const [fetchUser, isUserLoading, userError] = useFetching(async () => {
    let response = await UserSevice.getUserById(isAuth.user.id);
    setUser(response.data.user[0]);
    fetchPosts(response.data.user[0].id);
    setUserData({login: response.data.user[0].login, email: isAuth.user.email, password: response.data.user[0].password, fullName: response.data.user[0].fullName})
    // fetchPosts(response.data.user[0].id)
  });

  useEffect(() => {
    fetchUser();
  }, []);

  const dispatch = useDispatch();

  function apiLogOut() {
    dispatch({ type: "LOGOUT", payload: {} });
    localStorage.removeItem("token")
  }

  return (
    <div className={classes.rootOfUser}>
      <div className={classes.user}>
        <h4>User: {user.login}</h4>
        <MyModal visible={modal} setVisible={setModal}>
          <UserForm fetchFunc={fetchEditUser} callback={fetchUser} actionTitle={"Edit"} userData={userData}/>
        </MyModal>
        <div >
          <div style={{ width: 200, height: 200 }}>
            <img style={{ width: 200, height: 200 }} alt={"avatar"} src={"http://localhost:5000/" + user.profileImg} />
          </div>
          <div className={classes.user__information}>
            <h4>Fullname: {user.fullName}</h4>
            <h4>login: {user.login}</h4>
            <h4>email: {isAuth.user.email}</h4>
            <h4>role: {user.role}</h4>
            <h4>rating: {user.rating}</h4>
          </div>
        </div>
        <div><MyButton onClick={async () =>{
          setModal(true);
        } }>Edit profile</MyButton></div>
        <div><MyButton onClick={apiLogOut}>LogOut</MyButton></div>
      </div>
      <div className={classes.rootOfPosts}>
        {/* <h5>Posts:</h5> */}
        {isPostLoading
          ? <div className={"loaderDiv"}><Loader /></div>
          : <PostList posts={posts} title={"Posts:"} css={classes.post} />
        }
      </div>
    </div>

  )
}

export default User