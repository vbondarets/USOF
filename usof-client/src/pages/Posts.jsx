import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import PostSevice from '../API/PostService';
import PostFilter from '../components/PostFilter';
import PostForm from '../components/PostForm';
import PostList from '../components/PostList';
import MyButton from '../components/UI/button/MyButton';
import Loader from '../components/UI/Loader/Loader';
import MyModal from '../components/UI/MyModal/MyModal';
import Pagination from '../components/UI/pagination/Pagination';
import { useFetching } from '../hooks/useFetching';
import { usePosts } from '../hooks/usePost';
import '../styles/app.css'
import { getPagesArray, getPagesCount } from '../utils/pages';
import { getPostsFromPage } from '../utils/postCounter';

function Posts() {

  const [posts, setPosts] = useState([]);
  const [filter, setFilter] = useState({ sort: '', query: '' });
  const [modal, setModal] = useState(false);
  const [totalPages, setTotalPages] = useState(0);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);

  const [fetchPosts, isPostLoading, postError] = useFetching(async () => {
    let response = await PostSevice.getAll();
    response.data.posts.forEach(el => {
      let string = el.publishDate;
      let stringArr = string.split("T");
      stringArr = stringArr[0].split("-");
      el.publishDate = stringArr.join(" ");
    });
    let newPostArr = getPostsFromPage(limit, page, response.data.posts);
    setPosts(newPostArr);
    const totalCount = response.data.posts.length;
    setTotalPages(getPagesCount(totalCount, limit))
  });
  const [fetchCreatePost, isCreatePostLoading, CreatePostError] = useFetching(async (newPost, setTitle, setContent, setCatigory) => {
    const response = await PostSevice.createPost(newPost);
    if (response.data.resp === "Created") {
      setTitle("");
      setContent("");
      setCatigory('');
      setModal(false);
      fetchPosts();
      return "data";
    }
    else{
      alert("Error:", response.data);
    }
  });

  function createPost (newPost, setTitle, setContent){
    fetchCreatePost(newPost, setTitle, setContent);
  }
  const removePost = (id) => {
    setPosts(posts.filter(p => p.id !== id))

  }
  const sortedAndSearchedPosts = usePosts(posts, filter.sort, filter.query);

  useEffect(() => {
    fetchPosts();
  }, [page]);
  const changePage = (page) => {
    setPage(page);
  }
  const isAuth = useSelector(state => state.status);


  return (
    <div className="App">
      {/* <MyButton onClick={fetchPosts}>Get Posts</MyButton> */}
      {isAuth &&
        <MyButton onClick={() => setModal(true)}>
          Create post
        </MyButton>
      }
      <MyModal visible={modal} setVisible={setModal}>
        <PostForm create={fetchCreatePost} />
      </MyModal>
      <hr style={{ margin: '15px' }} />
      <PostFilter
        filter={filter}
        setFilter={setFilter}
      />
      {postError &&
        <h1>Ops, something wrong: {postError}</h1>
      }
      {isPostLoading
        ? <div className={"loaderDiv"}><Loader /></div>
        : <PostList remove={removePost} posts={sortedAndSearchedPosts} title={"Post list"} />
      }
      <Pagination
        page={page}
        changePage={changePage}
        totalPages={totalPages}
      />
    </div>
  );
}

export default Posts;
