import React from 'react';
// import { useContext } from 'react';
import { useSelector } from 'react-redux';
import { Redirect, Route, Switch } from 'react-router-dom';
import { publicRoutes, privateRoutes, adminRoutes } from '../router';
// import { AuthContext } from './context';

const AppRouter = () => {
    const isAuth = useSelector(state => state.status);
    const role = useSelector(state => state.user.role);
    return (
        isAuth
            ?
            <Switch>
                {privateRoutes.map(route =>
                    <Route
                        key={route.path}
                        component={route.component}
                        path={route.path}
                        exact={route.exact}
                    />
                )}
                if({role} === {"ADMIN"}) {
                    adminRoutes.map(route =>
                        <Route
                            key={route.path}
                            component={route.component}
                            path={route.path}
                            exact={route.exact}
                        />
                    )
                }

                <Redirect to='/posts' />
            </Switch>
            :
            <Switch>
                {publicRoutes.map(route =>
                    <Route
                        key={route.path}
                        component={route.component}
                        path={route.path}
                        exact={route.exact}
                    />
                )}
                <Redirect to='/login' />
            </Switch>


    )
}

export default AppRouter