import Admin from "../pages/Admin";
import CategoryPosts from "../pages/CategoryPosts";
import Error from "../pages/Error";
import Login from "../pages/Login";
import PostIdPage from "../pages/PostIdPage";
import Posts from "../pages/Posts";
import Register from "../pages/Register";
import User from "../pages/User";
import UserId from "../pages/UserId";

export const publicRoutes = [
    {path: "/login", component: Login, exact: true},
    {path: "/register", component: Register, exact: true},
    {path: "/posts", component: Posts, exact: true},
    {path: "/posts/:id", component: PostIdPage, exact: true},
    {path: "/user/:id", component: UserId, exact: true},
    {path: "/error", component: Error, exact: true},
];

export const privateRoutes = [
    {path: "/user", component: User, exact: true},
    {path: "/posts", component: Posts, exact: true},
    {path: "/posts/:id", component: PostIdPage, exact: true},
    {path: "/user/:id", component: UserId, exact: true},
    {path: "/category/:id", component: CategoryPosts, exact: true},
    {path: "/error", component: Error, exact: true},
];

export const adminRoutes = [
    {path: "/admin", component: Admin, exact: true},
];

