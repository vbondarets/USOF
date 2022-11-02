import React, { useEffect, useState } from 'react'
import CategoriesSevice from '../API/CategoriesService';
import UserSevice from '../API/UserService';
import CategoriesList from '../components/CategoriesList'
import MyButton from '../components/UI/button/MyButton';
import MyInput from '../components/UI/input/MyInput';
import Loader from '../components/UI/Loader/Loader';
import UserList from '../components/UserList';
import { useFetching } from '../hooks/useFetching';
import classes from './css/Admin.module.css';

const Admin = () => {
    const [categories, setCatigories] = useState([]);
    const [users, setUsers] = useState([]);
    const [categoryTitle, setCategoryTitle] = useState('');
    const [categoryDescription, setCategoryDescription] = useState('');
    const [formError, setFormError] = useState('')




    const [fetchCategories, categoriesIsLoading] = useFetching(async () => {
        const response = await CategoriesSevice.getAll();
        setCatigories(response.data.categories);
    });
    const [fetchUsers, usersIsLoading] = useFetching(async () => {
        const response = await UserSevice.getAll();
        setUsers(response.data.users);
    });
    const [fetchCreateCategory] = useFetching(async (body) => {
        const response = await CategoriesSevice.createCategory(body);
        if(response.data.resp === "Created"){
            await fetchCategories();
        }
    });

    useEffect(() => {
        fetchCategories();
        fetchUsers();
    }, []);

    return (
        <div className={classes.adminRoot}>
            {categoriesIsLoading
                ?<Loader/>
                :<CategoriesList 
                    callback={fetchCategories}
                    className={classes.categoriesList}
                    categories={categories}
                />
            }
            {usersIsLoading
                ?<Loader/>
                :<UserList
                    callback={fetchUsers}
                    users={users}
                    className={classes.usersList}
                />
            }
            <div className={classes.categoryForm}>
                <h1>Create category</h1>
                <div>
                    <MyInput
                        value={categoryTitle}
                        onChange={e => setCategoryTitle(e.target.value)}
                        type="text"
                        placeholder="Category's title"
                    />
                    <MyInput
                        value={categoryDescription}
                        onChange={e => setCategoryDescription(e.target.value)}
                        type="text"
                        placeholder="Category's description"
                    />
                    <h4>{formError}</h4>
                    <MyButton onClick={() => {
                        if((!categoryTitle || categoryTitle==='') || (!categoryDescription || categoryDescription==='')){
                            setFormError('Fill all fields');
                        }
                        else {
                            fetchCreateCategory({title: categoryTitle, description: categoryDescription});
                            setFormError('')
                            setCategoryTitle('');
                            setCategoryDescription('');
                        }
                    }}>Create</MyButton>
                </div>
            </div>
        </div>
    )
}

export default Admin