import React from 'react';
import classes from './NavigationItem.css';
import { NavLink } from "react-router-dom";

const navigationItem = (props) => (
    <li onClick={props.aboutToggle ? props.aboutToggle : props.closed} className={classes.NavigationItem}>
        <NavLink
            to={props.link}
            exact
            activeClassName={classes.active}>{props.children}</NavLink>
    </li>
);

export default navigationItem;
