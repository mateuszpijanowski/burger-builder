import React, { Component } from 'react';
import Aux from '../../hoc/Aux/aux';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';
import Modal from '../../components/UI/Modal/Modal';
import classes from './Layout.css';
import About from '../../components/UI/Modal/About/About';

import { connect } from 'react-redux';

class Layout extends Component {
    state = {
        showSideDrawer: false,
        showAbout: false
    };

    sideDrawerToggleHandler = () => {
        this.setState((prevState) => {
            return { showSideDrawer: !prevState.showSideDrawer };
        });
    };

    aboutToggleHandler = () => {
        if (this.state.showSideDrawer) {
            this.setState({ showSideDrawer: false });
        }

        this.setState((prevState) => {
            return { showAbout: !prevState.showAbout };
        });
    };

    render() {
        const aboutComponent = (
            <Modal
                show={this.state.showAbout}
                modalClosed={this.aboutToggleHandler}>
                <About />
            </Modal>
        );

        return (
            <Aux>
                { this.state.showAbout ? aboutComponent : null }
                <Toolbar
                    isAuth={this.props.isAuth}
                    aboutToggle={this.aboutToggleHandler}
                    drawerToggleClicked={this.sideDrawerToggleHandler} />
                <SideDrawer
                    isAuth={this.props.isAuth}
                    aboutToggle={this.aboutToggleHandler}
                    closed={this.sideDrawerToggleHandler}
                    open={this.state.showSideDrawer} />
                <main className={classes.Content}>
                    {this.props.children}
                </main>
            </Aux>
        );
    }
}

const mapStateToProps = state => {
    return {
        isAuth: state.auth.token !== null
    };
};

export default connect(mapStateToProps)(Layout);
