import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import UserSevice from '../API/UserService';
import { useFetching } from '../hooks/useFetching';
import MyButton from './UI/button/MyButton';

function setPostStatus( status ){
    if(status === 1){
        return "Opened";
    }
    else {
        return "Closed";
    }
}

const PostItem = (props) => {
    
    const router = useHistory();
    const goTo = (id) => {
        router.push('/posts/'+ id);
    }
    return (
        <div className={"post " + props.css} onClick={() => goTo(props.post.id)}>
            <div className="post__content">
                <p>Status: {setPostStatus(props.post.status)}</p>
                <p>{props.post.publishDate}</p>
                <strong>{props.post.id} {props.post.title}</strong>
                <p>{props.post.content}</p>
                <div>
                    {props.post.body}
                </div>
                {/* <div className="post__btns">
                    <MyButton onClick={()=> router.push('/posts/'+ props.post.id)}>Open</MyButton>
                    <MyButton onClick={()=> props.remove(props.post.id)}>Delete</MyButton>
                </div> */}
            </div>
        </div>
    )
}

export default PostItem;