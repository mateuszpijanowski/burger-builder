import React from 'react';
import classes from './About.css';
import GitHub from '../../../../assets/images/github.png';

import Logo from '../../../Logo/Logo';

const about = () => (
    <div className={classes.Content}>
        <div className={classes.Logo}>
            <Logo />
        </div>

        <h2>What is - MyBurger?</h2>

        <p>
            This is a web application where you can create own burger by burger builder system.
            Next, in simulation you can order your burger and see list,
            data and status of your orders.
        </p>

        <a className={classes.Github}
           target="_blank"
           rel="noopener noreferrer"
           href="https://github.com/mateuszpijanowski/burger-builder">
            <img alt="GitHub" src={GitHub} />
        </a>

        <p className={classes.Copy}>
            &copy; by Mateusz Pijanowski
        </p>
    </div>
);

export default about;