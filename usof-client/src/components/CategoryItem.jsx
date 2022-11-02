import React from 'react'
import { useHistory } from 'react-router-dom'
import CategoriesSevice from '../API/CategoriesService';
import { useFetching } from '../hooks/useFetching';
import classes from './css/categoriesList.module.css'
import MyButton from './UI/button/MyButton';

const CategoryItem = ({ category, callback }) => {
    const router = useHistory();
    const [deleteCategory] = useFetching(async (id) => {
        try {
            const response = await CategoriesSevice.deleteCategory(id);
            if (response.data.resp === "Deleted") {
                callback()
            }
        }
        catch (err) {
            alert(err)
        }

    });
    return (
        <div className={classes.category} onClick={() => {router.push("category/" +category.id)}}>
            <h4>{category.title}</h4>
            <h4>{category.description}</h4>
            <MyButton onClick={(e)=>{
                    e.stopPropagation();
                    deleteCategory(category.id);
                }}>
                Delete
            </MyButton>
        </div>
    )
}

export default CategoryItem