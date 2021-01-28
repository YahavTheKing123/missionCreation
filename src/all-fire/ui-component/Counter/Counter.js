import React, { Component } from 'react';

export const counterTypes = {
    lenght: 'length',
    azimuth: 'azimuth',
    timer: 'timer',
}

const buttonsActions = {
    increment: 'increment',
    decrement: 'decrement'
}

export default class Counter extends Component {

    increment(value) {
        return value + this.props.valueChangger;
    }

    decrement(value) {
        const newValue = value - this.props.valueChangger;
        return newValue < 0 ? 0 : newValue        
    }

    // componentDidUpdate(prevProps, prevState) {
    //     if (this.props.type === counterTypes.lenght) {

    //         console.log(prevProps.value, this.props.value)
    //     }
    // }

    onButtonClick = (buttonType) => {  

        if (this.props.type === counterTypes.timer) {

            let minutes = '';
            let seconds = '';

            if (!this.props.value || !this.props.value.includes(':')) {
                minutes = '00';
                seconds = '00';
            } else {
                [minutes, seconds] = this.props.value.split(':');
            }
            let oldValue = parseInt(minutes);

            if (isNaN(oldValue)) {
                oldValue = 0;
            }
    
            let newValue = buttonType === buttonsActions.increment ? this.increment(oldValue) : this.decrement(oldValue);
            if (newValue < 10) {
                newValue = '0' + newValue;
            }

            newValue = `${newValue}:${seconds}`;
            this.props.onChange(this.props.id, newValue);
            
        } else {
            let oldValue = parseInt(this.props.value);

            if (isNaN(oldValue)) {
                oldValue = 0;
            }
    
            let newValue = buttonType === buttonsActions.increment ? this.increment(oldValue) : this.decrement(oldValue);
            this.props.onChange(this.props.id, newValue.toString());
        }        
    }

    mask = (value, limit, separator) => {
        var output = [];
        for (let i = 0; i < value.length; i++) {
            if ( i !== 0 && i % limit === 0) {
                output.push(separator);
            }
            
            output.push(value[i]);
        }
        
        return output.join("");
    }

    addColon(value) {
        const numberPattern = /^\d{0,4}$/g;
        const numberSeparator = ":";

        let newValue = value.replace(/[^\d]/g, '');
        if (newValue.match(numberPattern)) {
            newValue = this.mask(newValue, 2, numberSeparator);
            return newValue;
        } else {
            return this.props.value;
        }
    }
    
    validateNum(value) {
        let allowedChars = "0123456789";
        let flag;
    
        for(let i=0; i< value.length; i++) {       
            flag = false;
    
            for(let j=0; j < allowedChars.length; j++){
                if(value.charAt(i) == allowedChars.charAt(j)) {
                    flag = true; 
                }
            }
    
            if (flag == false) { 
                value = value.replace(value.charAt(i),""); 
                i--; 
            }            
        }      
        return value;  
    }

    onChange = e => {
        const value = e.target.value;
        let newValue = '';

        switch (this.props.type) {
            case counterTypes.lenght:                
                newValue = this.validateNum(value);
                break;
            case counterTypes.azimuth:
                newValue = this.validateNum(value);                                
                break;
            case counterTypes.timer:
                newValue = this.addColon(value);
                break;
            default:
                break;
        }         

        this.props.onChange(this.props.id, newValue)      
    }

    getMaxLength() {
        switch (this.props.type) {
            case counterTypes.lenght:                
                return 6;
            case counterTypes.azimuth:                                             
                return 3;
            case counterTypes.timer:
                return 5                
            default:
                break;
        } 
    }

    getUnitsLabel() {
        switch (this.props.type) {
            case counterTypes.lenght:                
                return `(מטר)`;
            case counterTypes.azimuth:
                return `(מעלות)`;                
            case counterTypes.timer:
                return `(דקות)`;       
            default:
                break;
        } 
    }

    render() {
        const readonlyClass = this.props.isReadonly ? 'counter-readonly' : ''
        return (
            <div className='counter-wrapper'>
                <span className='counter-label'>{this.props.title}<span className='counter-units-label'>{this.getUnitsLabel()}</span></span>
                <div className={`counter-value-buttons-wrapper ${readonlyClass}`}>
                    <span className='counter-button' onClick={this.onButtonClick.bind(this, buttonsActions.increment)}>+</span>
                    <input 
                        className={`counter-value ${this.props.type}`} 
                        value={this.props.value || ''} 
                        onChange={this.onChange}
                        placeholder={this.props.emptyValue}
                        maxLength={this.getMaxLength()}
                    />
                    <span className='counter-button' onClick={this.onButtonClick.bind(this, buttonsActions.decrement)}>-</span>
                </div>
            </div>
        )
    }
}

