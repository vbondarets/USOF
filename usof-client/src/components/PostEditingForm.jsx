import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import CategoriesSevice from '../API/CategoriesService';
import PostSevice from '../API/PostService';
import { useFetching } from '../hooks/useFetching';
import MyButton from './UI/button/MyButton';
import MyInput from './UI/input/MyInput';
import MySelect from './UI/select/MySelect';


const PostEditingForm = ({title, content, publishDate, category_id, author_id, fetchPost, postId}) => {
    const [postTitle, setTitle] = useState(title);
    const [postContent, setContent] = useState(content);
    const [postCategories, setCatigories] = useState([]);
    const [postCategory, setCategory] = useState(category_id)

    const [fetchCategories] = useFetching(async () => {
        const response = await CategoriesSevice.getAll();
        const categories = response.data.categories;
        setCatigories(categories);
        // console.log(categories)
    });
    const user = useSelector(state => state.user);

    const [fetchEditPost] = useFetching(async (id, body) => {
        try{
            const response = await PostSevice.editPost(id, body);
            if(response.data.resp === "Changed"){
                fetchPost();
            }
        }
        catch(err){
            console.log(err)
        }
        // console.log(id)
        console.log(body)
    });


    useEffect(() => {
        fetchCategories();
        setTitle(title);
        setContent(content);
        setCategory(category_id);
    }, [author_id]);

    return (
        <form>
            <MyInput
                value={postTitle}
                onChange={e => setTitle(e.target.value)}
                type="text"
                placeholder="Post's title"
            />
            <MySelect
                value={postCategory}
                defaultValue={"Choose category"}
                options={postCategories.map(el =>{
                    return {value: el.id, name: el.title}
                })}
                onChange={selectedCategory => setCategory(selectedCategory)}
            />
            <MyInput
                value={postContent}
                onChange={e => setContent(e.target.value)}
                type="text"
                placeholder="Post's content"
            />
            <MyButton 
                onClick={(e) => {
                    e.preventDefault();
                    fetchEditPost(
                        postId,
                        {
                            author_id: author_id,
                            title: postTitle,
                            publishDate: publishDate,
                            content: postContent,
                            category_id: parseInt(postCategory)
                        }
                    )
                }}>Edit post
            </MyButton>
        </form>
    )
}

export default PostEditingForm