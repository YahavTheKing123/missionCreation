import React, { Component } from 'react';
import FirePlan from './FirePlan';
import './FirePlans.less'
import './FirePlans.css';

export default class FirePlans extends Component {

    render() {
        const plans = [];

        for (let index = 0; index < 10; index++) {
            plans.push(<FirePlan key={index}/>);
        }

        return (
            <div className='fire-plans-wrapper'>
                {plans}
            </div>
        )
    }
}
