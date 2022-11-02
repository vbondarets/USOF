import React, { useEffect } from 'react'
import { useState } from 'react';
import { useHistory, useParams } from 'react-router-dom'
import CategoriesSevice from '../API/CategoriesService';
import PostFilter from '../components/PostFilter';
import PostList from '../components/PostList';
import Loader from '../components/UI/Loader/Loader';
import { useFetching } from '../hooks/useFetching';
import { usePosts } from '../hooks/usePost';

const CategoryPosts = () => {
    const params = useParams();
    const router = useHistory();
    const [posts, setPosts] = useState([]);
    const [filter, setFilter] = useState({ sort: '', query: '' });

    const sortedAndSearchedPosts = usePosts(posts, filter.sort, filter.query);

    const [fetchPosts, isPostLoading] = useFetching(async () => {
        const response = await CategoriesSevice.getByIdPosts(params.id);
        console.log(response.data);
        response.data.posts.forEach(el => {
          let string = el.publishDate;
          let stringArr = string.split("T");
          stringArr = stringArr[0].split("-");
          el.publishDate = stringArr.join(" ");
        });
        setPosts(response.data.posts);
    });

    useEffect(() => {
        fetchPosts();
      }, []);

  return (
    <div>
        <PostFilter
            filter={filter}
            setFilter={setFilter}
        />
        {isPostLoading
            ? <div className={"loaderDiv"}><Loader /></div>
            : <PostList posts={sortedAndSearchedPosts} title={"Post list"} />
        }
    </div>
  )
}

export default CategoryPosts