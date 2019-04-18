import React, { Component } from 'react';
import { User as UserActions } from 'actions';
import reblogButton from '../../../public/img/reblogButton.svg';
import reblogButtonClicked from '../../../public/img/reblogButtonClicked.svg';

class ReblogButton extends Component {

    static defaultProps = {
        id: '',
        onReblog: () => {},
        src: reblogButton
    };

    handleClick = e => {
        if (!this.props.reblogged) {
            this.props.onReblog({ id: this.props.id, reblogged: this.props.reblogged, src: reblogButtonClicked });
            reblogPost(this.props.user.id, this.props.id);
        }
    };

    render() {
        return <img src={this.props.src} className="reblogButton" onClick={this.handleClick} />;
    }
}

export default ReblogButton;

//still need to connect the User/state.User to this action
//still need to complete action in the Activity component