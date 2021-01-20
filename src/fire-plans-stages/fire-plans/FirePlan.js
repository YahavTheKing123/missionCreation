import React, { Component } from 'react';
import './FirePlans.less';
import PlanStage from './PlanStage';
import './FirePlans.css';

export default class FirePlan extends Component {

    state = {
        isOpen: true//this.props.isOpen
    }

    renderStages() {
        const stages = [];
        for (let i = 0; i < 10; i++) {            
            stages.push(<PlanStage key={i}/>)
        }
        return stages;
    }

    render() {
        const isOpenClass = this.state.isOpen ? 'open' : '';
        const isCurrentClass = this.props.isCurrent ? 'current' : '';

        return (
            <div className={`fire-plan-wrapper`}>
                <div className={`fire-plan-header ${isCurrentClass}`}>
                    <div className={'fire-plan-header-details'}>
                        <span>Icon</span>
                        <span className={`fire-plan-code-word ${isCurrentClass}`}>פטיש 2</span>
                        <span className='fire-plan-header-sepatator'></span>
                        <span className='fire-plan-last-command'>אש</span>
                        <span className='fire-plan-num-of-stages'>3 שלבים</span>
                    </div>
                    <span className={`fire-plan-extender ${isOpenClass}`} onClick={() => this.setState({isOpen: !this.state.isOpen})}></span>
                </div>
                <div className={`stages-container ${isOpenClass}`}>
                    {this.renderStages()}
                </div>
            </div>
        )
    }
}
