import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import MyButton from './UI/button/MyButton'
import MyInput from './UI/input/MyInput'

const CommentForm = ({ buttonText, postId, commentId, setButtonText, fetchFunc}) => {
    const user = useSelector(state => state.user);
    const [content, setContent] = useState('');
    const [message, setMessage] = useState ('');

    const sendReq = (e) => {
        e.preventDefault();
        if(content){
            const Comment = {
                authorId: user.id,
                content: content,
                postId: postId,
                commentId: commentId
            }
            setButtonText('add');
            console.log(Comment);
            fetchFunc(postId, Comment, setMessage, setContent)
        }
        else{
            setMessage("Fidel is empty")
        }
    }

    return (
        <form>
            <h1>Comment</h1>
            <MyInput
                value={content}
                onChange={e => setContent(e.target.value)}
                type="text"
                placeholder="Comment content"
            />
            <h2>{message}</h2>
            <MyButton onClick={(e) => sendReq(e)}>{buttonText}</MyButton>
        </form>
    )
}

export default CommentForm