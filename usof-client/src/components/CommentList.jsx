import React from 'react'
import { useSelector } from 'react-redux'
import CommentItem from './CommItem'
import classes from './css/comment.module.css'
import MyButton from './UI/button/MyButton'

const CommentList = ({ comments, setModal, setCommentId, setbuttonText , likes, fetchLikes, fetchComments}) => {
    const returnCurrCommentLikes = (likes, commentId) => {
        let commentLikes = [];
        likes.forEach(like =>{
            if(like.commentId === commentId){
                commentLikes.push(like);
            }
        })
        return commentLikes;
    }
    // console.log(likes);
    const isAuth = useSelector(state => state.status);
    if (comments.length > 0) {
        return (
            <div>
                <h2 className={classes.commentHeader}>{comments.length} comments</h2>
                {isAuth && 
                    <MyButton onClick={()=> {setModal(true)}} >Add Comment</MyButton>
                }
                <div className={classes.commenList}>
                    {comments.map((comment, index) =>
                        <div key={comment.id}>
                            <CommentItem 
                                comment={comment} 
                                index={index} 
                                comments={comments} 
                                setModal={setModal} 
                                setCommentId={setCommentId} 
                                setbuttonText={setbuttonText} 
                                likes={returnCurrCommentLikes(likes, comment.id)} 
                                fetchLikes={fetchLikes}
                                fetchComments={fetchComments}
                            />
                            {/* <CommentItem comment={comment} index={index}  comments={comments}/> */}
                        </div>
                    )}

                </div>
            </div>
        )
    }
    else 
    {
        return (
            <div>
                <h2 className={classes.commentHeader}>No comments yet</h2>
                {isAuth && 
                    <MyButton 
                        onClick={()=> {
                            setbuttonText("Add");
                            setModal(true);
                        }}>
                        Create Comment
                    </MyButton>
                }
                <div className={classes.commenList}></div>
            </div>
            
        )
    }

}

export default CommentList