import React, { Component } from 'react'
import './ContextMenu.less';
import './ContextMenu.css';

export default class ContextMenu extends Component {

    wrapperRef = React.createRef();

    componentDidMount() {
        document.addEventListener('mousedown', this.handleClickOutside);
    }

    componentWillUnmount() {
        document.removeEventListener('mousedown', this.handleClickOutside);
    }

    handleClickOutside = (event) => {
        if (this.wrapperRef && !this.wrapperRef.current.contains(event.target)) {
            this.props.onCloseContextMenu();
        }
    }

    render() {
        return (
            <div ref={this.wrapperRef} className={'ContextMenuWrapper'} style={{top: this.props.top, left: this.props.left}}>
                {this.props.children}
            </div>
        )
    }
}
