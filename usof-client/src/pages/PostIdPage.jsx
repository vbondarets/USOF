import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link, useHistory, useParams } from 'react-router-dom'
import CategoriesSevice from '../API/CategoriesService';
import LikeSevice from '../API/LikeService';
import PostSevice from '../API/PostService';
import UserSevice from '../API/UserService';
import CommentForm from '../components/CommentForm';
import CommentList from '../components/CommentList';
import PostEditingForm from '../components/PostEditingForm';
import MyButton from '../components/UI/button/MyButton';
import Loader from '../components/UI/Loader/Loader';
import MyModal from '../components/UI/MyModal/MyModal';
import { useFetching } from '../hooks/useFetching';

const PostIdPage = () => {
    const params = useParams();
    const router = useHistory();
    const [post, setPost] = useState({})
    const [comments, setComments] = useState([]);
    const [user, setUser] = useState([]);
    const [modal, setModal] = useState(false);
    const [editPostModal, setEditPostModal] = useState(false);
    const [commentFormText, setCommentFormText] = useState("Add");
    const [commentId, setCommentId] = useState(0);
    const [likes, setLikes] = useState([]);
    const [postLikes, setPostLikes] = useState([]);
    const [commentLikes, setCommentLikes] = useState([]);
    const isAuth = useSelector(state => state.status);
    const isAuthUser = useSelector(state => state.user);
    const [category, setCategory] = useState([]);

    const returnPostLikes = (likes) => {
        let commentArr = [];
        likes.forEach(like => {
            if (like.commentId !== 0) {
                commentArr.push(like);
            }
        });
        return commentArr;
    }

    const [fetchPostLikes] = useFetching(async () => {
        try {
            const response = await LikeSevice.getAll(params.id);
            setLikes(response.data.likes);
            // console.log(response.data.likes);
            let postArr = [];
            response.data.likes.forEach(like => {
                if (like.postId !== 0 && like.commentId === 0) {
                    postArr.push(like);
                }
            })
            setPostLikes(postArr);
        }
        catch (err) {
            setLikes([])
            setPostLikes([])
            console.log(err)
        }
    });

    const [fetchPostById, isLoading, error] = useFetching(async () => {
        try {
            const response = await PostSevice.getById(params.id);
            fetchPostLikes();
            setPost(response.data.post[0]);
            fetchComments()
            fetchUser(response.data.post[0].author_id);
            fetchCategory(response.data.post[0].category_id);
            setEditPostModal(false);
        }
        catch (err) {
            router.push("/error")
        }
    });
    const [fetchComments, isCommLoading, CommError] = useFetching(async () => {
        await fetchPostLikes();
        const response = await PostSevice.getPostComments(params.id);
        setComments(response.data.comments);
        // console.log(likes);
    });
    const [fetchCreateComments, isCreateCommLoading, CreateCommError] = useFetching(async (id, comment, setMessage, setContent) => {
        try {
            const response = await PostSevice.createPostComment(params.id, comment)
            console.log(response.data.resp);
            if (response.data.resp === "Created") {
                setMessage(response.data.resp)
                setTimeout(() => {
                    setContent('');
                    fetchComments();
                    setMessage('');
                    setModal(false);
                }, 500);
            }
            // fetchComments();
        }
        catch (err) {
            console.log(err.response.data)
        }

    });
    const [fetchUser] = useFetching(async (id) => {
        const response = await UserSevice.getUserById(id);
        const User = response.data.user[0];
        setUser(User);
    });
    const [fetchCategory] = useFetching(async (id) => {
        try {
            const response = await CategoriesSevice.getById(id);
            setCategory(response.data.category[0]);
        }
        catch (err) {
            console.log(err)
        }

    });
    const likeStatus = (likes) => {
        let status = "Like"
        likes.forEach(like => {
            if (like.authorId === isAuthUser.id && like.type === 1) {
                status = "Liked"
            }
        })
        return status
    }
    const dislikeStatus = (likes) => {
        let status = "Dislike"
        likes.forEach(like => {
            if (like.authorId === isAuthUser.id && like.type === -1) {
                status = "Disliked"
            }
        })
        return status
    }

    useEffect(() => {
        fetchPostById()
    }, []);

    const [createLike] = useFetching(async (body) => {
        try {
            const response = await LikeSevice.createPostLike(params.id, body);
            if (response.data.resp === "Created" || response.data.resp === "Updated") {
                fetchPostLikes();
            }
            else {
                alert("Error")
            }
        }
        catch (err) {
            alert(err)
        }

    });
    const [deleteLike] = useFetching(async (id, body) => {
        try {
            const response = await LikeSevice.deleteLike(id, body);
            if (response.data.resp === "Deleted" || response.data.resp === "Updated") {
                fetchPostLikes();
            }
            else {
                alert("Error")
            }
        }
        catch (err) {
            alert(err)
        }

    });
    const [deletePost] = useFetching(async (id) => {
        try {
            const response = await PostSevice.deletePost(id);
            if (response.data.resp === "Deleted") {
                router.push("/posts")
            }
            else {
                alert("Error")
            }
        }
        catch (err) {
            alert(err)
        }

    });

    const likeAction = (likes, action) => {
        for (let i = 0; i < likes.length; i++) {
            if (likes[i].authorId === isAuthUser.id && likes[i].type === action) {
                deleteLike(likes[i].id, { destinationId: post.author_id });
                return;

            }
        }
        createLike({
            "authorId": isAuthUser.id,
            "type": action,
            "destinationId": post.author_id
        })
        return;
    }
    const isYourOwn = () => {
        if (isAuthUser.id === post.author_id) {
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
        <div>
            <MyModal visible={modal} setVisible={setModal}>
                <CommentForm 
                    buttonText={commentFormText} 
                    postId={params.id} 
                    commentId={commentId} 
                    setButtonText={setCommentFormText} 
                    fetchFunc={fetchCreateComments} 
                />
            </MyModal>
            <MyModal visible={editPostModal} setVisible={setEditPostModal}>
                {/* {console.log(post.category_id)} */}
                <PostEditingForm
                    title={post.title}
                    content={post.content}
                    publishDate={post.publishDate}
                    category_id={post.category_id}
                    author_id={post.author_id}
                    fetchPost={fetchPostById}
                    postId={params.id}
                />
            </MyModal>
            {isLoading
                ? <Loader />
                : <div>
                    {user.login &&
                        <h4 onClick={() => { router.push("/user/" + user.id) }}>Author: {user.login}</h4>
                    }
                    <h3>Category: {category.title}</h3>
                    <h2>{post.title}</h2>
                    <h3>{post.content}</h3>
                </div>
            }
            {isAuth &&
                <div>
                    <MyButton onClick={() => { likeAction(postLikes, 1) }}>{likeStatus(postLikes)}</MyButton>
                    <MyButton onClick={() => { likeAction(postLikes, -1) }}>{dislikeStatus(postLikes)}</MyButton>
                    {(isYourOwn() || isYouAdmin()) &&
                        <div>
                            <MyButton onClick={() => {setEditPostModal(true)}}>Edit</MyButton>
                            <MyButton onClick={() => {deletePost(params.id)}}>Delete</MyButton>
                        </div>
                    }
                </div>

            }
            {isCommLoading
                ? <Loader />
                : <CommentList
                    comments={comments}
                    setModal={setModal}
                    setCommentId={setCommentId}
                    setbuttonText={setCommentFormText}
                    fetchFunc={fetchCreateComments}
                    likes={returnPostLikes(likes)}
                    fetchLikes={fetchPostLikes}
                    fetchComments={fetchComments}
                />
            }
            {/* {console.log(commentLikes)} */}
        </div>
    )
}

export default PostIdPage