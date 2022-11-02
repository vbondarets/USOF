import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import CategoriesSevice from '../API/CategoriesService';
import { useFetching } from '../hooks/useFetching';
import MyButton from './UI/button/MyButton';
import MyInput from './UI/input/MyInput';
import MySelect from './UI/select/MySelect';

const PostForm = ({create}) => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [categories, setCatigories] = useState([]);
    const [category, setCatigory] = useState('');
    

    const [fetchCategories, isCategoriesLoading, CategoriesError] = useFetching(async () => {
        const response = await CategoriesSevice.getAll();
        const categories = response.data.categories;
        setCatigories(categories);
        // console.log(categories)
    });
    const user = useSelector(state => state.user);

    function addNewPost (e) {
        e.preventDefault();
        const newPost ={
          title: title,
          content: content,
          category_id: parseInt(category),
          author_id: user.id
        }
        if(!title || !content || category===''){
            return;
        }
        create(newPost, setTitle, setContent, setCatigory);
    }
    useEffect(() => {
        fetchCategories();
    }, []);

    return (
        <form>
            <MyInput
                value={title}
                onChange={e => setTitle(e.target.value)}
                type="text"
                placeholder="Post's title"
            />
            <MySelect
                value={category}
                defaultValue={"Choose category"}
                options={categories.map(el =>{
                    return {value: el.id, name: el.title}
                })}
                onChange={selectedCategory => setCatigory(selectedCategory)}
            />
            <MyInput
                value={content}
                onChange={e => setContent(e.target.value)}
                type="text"
                placeholder="Post's content"
            />
            <MyButton onClick={addNewPost}>Create post</MyButton>
        </form>
    )
}

export default PostForm