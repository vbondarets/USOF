import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { useContext } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { NavbarContext } from '../../context';
import classes from "./Navbar.module.css"

const Navbar = () => {
    const isAuth = useSelector(state => state.status);
    const user = useSelector(state => state.user);
    // const [check, setCheck] = useState(isAuth);
    // useEffect(() => {
    //     setCheck(isAuth);
    // }, [isAuth]);
    {
        if (isAuth && user.role!=="ADMIN") {
            return (
                <div className={classes.navbar}>
                    <div className={classes.navbar__links}>
                        <Link className={classes.navbar__name} to="/">FORUM JAB</Link>
                        <Link className={classes.navbar__link} to="/posts">posts</Link>
                        <Link className={classes.navbar__link} to="/posts">categories</Link>
                        <Link className={classes.navbar__link} to="/user">{user.login}</Link>
                    </div>
                </div>
            )
        }
        if (isAuth && user.role==="ADMIN") {
            return (
                <div className={classes.navbar}>
                    <div className={classes.navbar__links}>
                        <Link className={classes.navbar__name} to="/">FORUM JAB</Link>
                        <Link className={classes.navbar__link} to="/posts">posts</Link>
                        {/* <Link className={classes.navbar__link} to="/posts">categories</Link> */}
                        <Link className={classes.navbar__link} to="/admin">admin</Link>
                        <Link className={classes.navbar__link} to="/user">{user.login}</Link>
                    </div>
                </div>
            )
        }
        else {
            return (
                <div className={classes.navbar}>
                    <div className={classes.navbar__links}>
                        <Link  className={classes.navbar__link} to="/posts">FORUM JAB</Link>
                        <Link className={classes.navbar__link__unsigned} to="/login">login</Link>
                        <Link className={classes.navbar__link} to="/register">register</Link>
                    </div>
                </div>
            )
        }
    }

}

export default Navbar