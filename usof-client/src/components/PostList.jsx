import React from 'react'
import PostItem from './PostItem';
import '../styles/app.css'
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { useHistory } from 'react-router-dom';

const PostList = ({ posts, title, remove , css}) => {
    // const router = useHistory();
    

    if (!posts.length) {
        return (
            <h1>Posts not found!</h1>
        )
    }

    return (
        <div>
            <h1>{title}</h1>
            <TransitionGroup>
                {posts.map((post, index) =>
                    <CSSTransition
                        key={post.id}
                        timeout={500}
                        classNames="post"
                    >
                        <PostItem 
                            remove={remove} 
                            number={index + 1} 
                            post={post} 
                            css={css}
                        />
                    </CSSTransition>
                    )}

            </TransitionGroup>

        </div>
    )
}

export default PostList