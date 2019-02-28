import React from 'react';
import classes from './NavigationItems.css';
import NavigationItem from './NavigationItem/NavigationItem';

const navigationItems = (props) => (
    <ul className={classes.NavigationItems}>
        <NavigationItem closed={props.closed} link="/">Burger Builder</NavigationItem>
        <NavigationItem closed={props.closed} link="/orders">Orders</NavigationItem>
        <NavigationItem closed={props.closed} link="/auth">Log in</NavigationItem>
    </ul>
);

export default navigationItems;
