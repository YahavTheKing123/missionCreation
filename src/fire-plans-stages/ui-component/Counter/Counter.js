import React, { Component } from 'react';
import './Counter.less';
import './Counter.css';


export default class Counter extends Component {

    state = {
        value: this.props.value || 0
    }

    increment = () => {
        this.setState({value: this.state.value + 1})
    }

    decrement = () => {
        if (this.state.value > 0) {
            this.setState({value: this.state.value - 1})
        }
    }

    render() {
        return (
            <div className='counter-wrapper'>
                <span className='counter-item counter-button' onClick={this.increment}>+</span>
                <span className='counter-item counter-value'>{this.state.value}</span>
                <span className='counter-item counter-button' onClick={this.decrement}>-</span>
            </div>
        )
    }
}
