import React from 'react';
import classes from './NavigationItems.css';
import NavigationItem from './NavigationItem/NavigationItem';

const navigationItems = (props) => (
    <ul className={classes.NavigationItems}>
        <NavigationItem closed={props.closed} link="/">Burger Builder</NavigationItem>
        { props.isAuth
            ? <NavigationItem closed={props.closed} link="/orders">Orders</NavigationItem>
            : null }
        { !props.isAuth
            ? <NavigationItem closed={props.closed} link="/auth">Authentication</NavigationItem>
            : <NavigationItem closed={props.closed} link="/logout">Logout</NavigationItem> }
    </ul>
);

export default navigationItems;
