import React from 'react';
import { Route, Redirect } from 'react-router-dom';

export const FirstTimeRoute = ({ component: Component, ...rest }) => (
    <Route
        {...rest}
        render={props =>
            (localStorage.getItem('user') && localStorage.getItem('firsttime')) ? (
                <Component {...props} />
            ) : (
                <Redirect
                    to={{ pathname: '/', state: { from: props.location } }}
                />
            )
        }
    />
);
