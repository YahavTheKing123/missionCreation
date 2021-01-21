import React, { Component } from 'react'

export default class Icon extends Component {    
    render() {
        return (
                <img 
                    className={this.props.className || null} 
                    src={this.props.iconUri} 
                    style={this.props.style || null}
                />
        )
    }
}
