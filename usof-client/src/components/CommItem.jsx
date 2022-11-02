import React, { useEffect, useState } from 'react';
import MyButton from './UI/button/MyButton';
import classes from './css/comment.module.css'
import { useFetching } from '../hooks/useFetching';
import UserSevice from '../API/UserService';
import { Link, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import LikeSevice from '../API/LikeService';
import CommentSevice from '../API/CommentService';

const CommentItem = ({comment, index, comments, setModal, setCommentId, setbuttonText, likes, fetchLikes, fetchComments}) => {
    const params = useParams();

    const [createLike] = useFetching(async (body) => {
        try{
            const response = await LikeSevice.createCommentLike(params.id, body);
            if(response.data.resp === "Created" || response.data.resp === "Updated"){
                fetchLikes();
            }
            else {
                alert("Error")
            }
        }
        catch(err){
            alert(err)
        }
        
    });
    const [deleteLike] = useFetching(async (id, body) => {
        try{
            const response = await LikeSevice.deleteLike(id, body);
            if(response.data.resp === "Deleted" || response.data.resp === "Updated"){
                fetchLikes();
            }
            else {
                alert("Error")
            }
        }
        catch(err){
            alert(err)
        }
        
    });
    const [deleteComment] = useFetching(async (id) => {
        console.log("comment deleting")
        try{
            const response = await CommentSevice.deleteComment(id);
            if(response.data.resp === "Deleted"){
                fetchComments();
            }
            else {
                alert("Error")
            }
        }
        catch(err){
            alert(err)
        }
        
    });

    const likeAction = (likes, action) =>{
        for(let i =0; i < likes.length; i++){
            if(likes[i].authorId === isAuthUser.id && likes[i].type === action){
                deleteLike(likes[i].id, {destinationId: comment.authorId});
                return;
                
            }
        }
        createLike({
            "commentId": comment.id,
            "authorId": isAuthUser.id,
            "type": action,
            "destinationId": comment.authorId
        })
        return;
    }
    const likeStatus = (likes) => {
        let status = "Like"
        likes.forEach(like => {
            if(like.authorId === isAuthUser.id && like.type === 1){
                status = "Liked"
            }
        })
        return status
    }
    const dislikeStatus = (likes) => {
        let status = "Dislike"
        likes.forEach(like => {
            if(like.authorId === isAuthUser.id && like.type === -1){
                status = "Disliked"
            }
        })
        return status
    }
    const [user, setUser] = useState([]);
    const isAuth = useSelector(state => state.status);
    const isAuthUser = useSelector(state => state.user);
    const [fetchUser] = useFetching(async () => {
        const response = await UserSevice.getUserById(comment.authorId);
        const User = response.data.user[0];
        setUser(User);
    });
    useEffect(() => {
        fetchUser();
    }, []);
    const sendReq = (e, commentId) =>{
        setCommentId(commentId);
        setModal(true);
        setbuttonText("Add");
    }
    const isYourOwn = () => {
        if(isAuthUser.id === comment.authorId){
            return true;
        }
        return false
    }
    const isYouAdmin = () => {
        if (isAuthUser.role === "ADMIN") {
            return true;
        }
        return false
    }
    return (
        <div className={classes.comment}>
            <div className="comment__content">
                <div>
                    <p>{index + 1}</p>
                    {comment.commentId !==0 &&
                        <p>
                            replied to {comments.map((el, index) => {
                                if(el.id === comment.commentId){
                                    return comments.indexOf(el) + 1;
                                }
                            })}
                        </p>
                    }
                    <Link to={"/user/" + comment.authorId}>{user.login}</Link>
                    <p>{comment.content}</p>
                </div>
                {isAuth &&
                    <div className="comment__btns">
                        <MyButton onClick={e => sendReq(e, comment.id)}>Reply</MyButton>
                        <MyButton onClick={() =>{likeAction(likes, 1)}}>{likeStatus(likes)}</MyButton>
                        <MyButton onClick={() =>{likeAction(likes, -1)}}>{dislikeStatus(likes)}</MyButton>
                    </div>
                }
                {(isYourOwn() || isYouAdmin()) &&
                    <MyButton onClick={() => {deleteComment(comment.id)}}>Delete</MyButton>
                }

            </div>
        </div>
    )
}

export default CommentItem;