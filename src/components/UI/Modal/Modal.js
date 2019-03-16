import React, { Component } from 'react';
import classes from './Modal.css';
import Backdrop from '../Backdrop/Backdrop';
import CSSTransition from 'react-transition-group/CSSTransition';

class Modal extends Component {

    shouldComponentUpdate(nextProps, nextState) {
        return nextProps.show !== this.props.show || nextProps.children !== this.props.children;
    }

    render() {
        const animationTiming = {
            enter: 400,
            exit: 600
        };

        return (
            <React.Fragment>
                <Backdrop show={this.props.show} clicked={this.props.modalClosed} />
                <CSSTransition
                    in={this.props.show}
                    timeout={animationTiming}
                    mountOnEnter
                    unmountOnExit
                    classNames={{
                        enterActive: classes["fade-enter-active"],
                        exitActive: classes["fade-exit-active"]
                    }}>
                    <div
                        className={classes.Modal}>
                        {this.props.children}
                    </div>
                </CSSTransition>
            </React.Fragment>
        );
    }
}

export default Modal;