import React, { useEffect } from 'react'
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import PostSevice from '../API/PostService';
import UserSevice from '../API/UserService';
import PostList from '../components/PostList';
import Loader from '../components/UI/Loader/Loader';
import { useFetching } from '../hooks/useFetching';
import classes from './css/User.module.css'

const UserId = () => {
    const params = useParams();
    const [user, setUser] = useState({});
    const [posts, setPosts] = useState([]);
    const [filter, setFilter] = useState({ sort: '', query: '' });
    const [modal, setModal] = useState(false);

    const [fetchPosts, isPostLoading, postError] = useFetching(async (id) => {
        let response = await PostSevice.getAll();
        const arr = response.data.posts;
        console.log(user);
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

    const [fetchUser, isUserLoading, userError] = useFetching(async (id) => {
        let response = await UserSevice.getUserById(id);
        setUser(response.data.user[0]);
        fetchPosts(response.data.user[0].id);
    });
    useEffect(() => {
        fetchUser(params.id);
    }, []);
    if(user.login !== undefined){
        return (
            <div className={classes.rootOfUser}>
              <div className={classes.user}>
                <h4>User: {user.login}</h4>
                <div >
                  <div style={{ width: 200, height: 200 }}>
                    <img style={{ width: 200, height: 200 }} alt={"avatar"} src={"http://localhost:5000/" + user.profileImg} />
                  </div>
                  <div className={classes.user__information}>
                    <h4>Fullname: {user.fullName}</h4>
                    <h4>login: {user.login}</h4>
                    <h4>role: {user.role}</h4>
                    <h4>rating: {user.rating}</h4>
                  </div>
                </div>
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
    else {
        return(
            <h1>USER NOT FOUND</h1>
        )
    }
}

export default UserId