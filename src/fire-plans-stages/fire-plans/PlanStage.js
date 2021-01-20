import React, { Component } from 'react';
import Counter from '../ui-component/Counter/Counter';
import Input from '../ui-component/Input/Input';
import './FirePlans.less'
import './FirePlans.css';
import ContextMenu from '../ui-component/ContextMenu/ContextMenu';

export default class PlanStage extends Component {

    state = {
        isOpen: false,
        isContextMenuOpen: false
    }
    moreActionBtnRef = React.createRef()

    componentDidMount() {
        this.gradientId = Math.random() * 100000
    }

    renderFirstRow() {
        const isCurrentClass = this.props.isCurrent ? 'current' : '';
        return (
            <div className={'plan-stage-first-row-wrapper'}>
                <span className='plan-stage-number-wrapper'>
                    <span className={`plan-stage-first-row-stage-number ${isCurrentClass}`}>שלב 1</span>
                    <span className={'plan-stage-first-row-stage-number-icon'}></span>
                </span>
                <span className='plan-stage-duration-wrapper'>
                    <span className={'plan-stage-first-row-stage-duration-icon'}></span>
                    <span className={'plan-stage-first-row-stage-duration'}>משך: 10:00</span>
                </span>
                <span className='plan-stage-rate-wrapper'>
                    <span className={'plan-stage-first-row-stage-rate-icon'}></span>
                    <span className={'plan-stage-first-row-stage-rate'}>קצב: 2 לדקה</span>
                </span>
            </div>
        );
    }

    renderSecondRow() {
        return (
            <div className='plan-stage-second-row-wrapper'>
                 <span className='plan-stage-second-row-box ammo'>20/20</span>
                 <span className='plan-stage-second-row-more-wrapper'>
                    <span className='plan-stage-second-row-box'>M107</span>
                    <span className='plan-stage-second-row-box'>M4a1</span>
                    <span className='plan-stage-second-row-box'>קרקע M739</span>
                 </span>
            </div>
        );
    }

    renderDetails() {
        return (
            <div className={'plan-stage-details'}>
                {this.renderFirstRow()}
                {this.renderSecondRow()}
            </div>
        )
    }

    renderMissle() {
        return (
            <div className='missile-wrapper'>
                <svg width="238px" height="51px" viewBox="0 0 238 51" version="1.1">                    
                    <defs>
                        <linearGradient x1="50%" y1="0%" x2="50%" y2="100%" id={`linearGradient-${this.gradientId}-1`}>
                            <stop stop-color="#B7C6CE" offset="0%"/>
                            <stop stop-color="#8EA3AF" offset="100%"/>
                        </linearGradient>
                        <linearGradient x1="50%" y1="0%" x2="50%" y2="100%" id={`linearGradient-${this.gradientId}-2`}>
                            <stop stop-color="#FFFDD9" offset="0%"/>
                            <stop stop-color="#CAC696" offset="100%"/>
                        </linearGradient>
                    </defs>
                    <g id="New-Bakash" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                        <g id="New-Bakash-4" transform="translate(-895.000000, -755.000000)">
                            <g id="Popups/Bakash-Expansion-full" transform="translate(723.000000, 237.000000)">
                                <g id="Popup/Plan/Pagazz" transform="translate(20.000000, 479.000000)">
                                    <g id="pagazz" transform="translate(152.000000, 39.000000)">
                                        <g id="Icons/Pagaz-Configuration">
                                            <g id="Group-11">
                                                <g id="Group-2" fill={`url(#linearGradient-${this.gradientId}-1)`}>
                                                    <path d="M50.5838428,1 L60.2662026,0 L60.2662026,0 L234.001631,0 C235.4928,1.70165941e-16 236.701631,1.20883118 236.701631,2.7 L236.701631,48.3 C236.701631,49.7911688 235.4928,51 234.001631,51 L60.2662026,51 L60.2662026,51 L50.5838428,50 C38.8523378,48.2456913 31.0216792,46.7547877 27.091867,45.5272893 C13.6256838,41.321053 4.60186423,34.8119565 0.0204081633,26 C4.57445195,17.0731098 13.5571532,10.3779421 26.9685118,5.91449704 C30.9177004,4.60016436 38.7894775,2.96199868 50.5838428,1 L50.5838428,1 Z" id="Rectangle"/>
                                                </g>
                                                <g id="Group-9" transform="translate(93.570168, 0.000000)">
                                                    <g id="Group-25" transform="translate(74.761928, 0.000000)">
                                                        <path d="M0.305991111,0 L12.8122063,0 C13.6169641,7.88981491e-16 14.2693492,0.652385079 14.2693492,1.45714286 L14.2693492,49.5428571 C14.2693492,50.3476149 13.6169641,51 12.8122063,51 L0.305991111,51 L0.305991111,51 L0.305991111,0 Z" id="Rectangle" fill={`url(#linearGradient-${this.gradientId}-2)`}/>
                                                        <rect id="Rectangle" fill="#778994" x="10.324544" y="0" width="4.00742115" height="51" rx="1.45714286"/>
                                                    </g>
                                                    <g id="Group-25" transform="translate(101.812021, 0.000000)">
                                                        <path d="M0.305991111,0 L12.8122063,0 C13.6169641,7.88981491e-16 14.2693492,0.652385079 14.2693492,1.45714286 L14.2693492,49.5428571 C14.2693492,50.3476149 13.6169641,51 12.8122063,51 L0.305991111,51 L0.305991111,51 L0.305991111,0 Z" id="Rectangle" fill={`url(#linearGradient-${this.gradientId}-2)`}/>
                                                        <rect id="Rectangle-Copy-16" fill="#F3F3EC" x="27.371966" y="26.4794633" width="13.9633581" height="24.5205367" rx="1.45714286"/>
                                                        <rect id="Rectangle" fill="#778994" x="10.324544" y="0" width="4.00742115" height="51" rx="1.45714286"/>
                                                    </g>
                                                    <g id="Group-25" transform="translate(128.862114, 0.000000)">
                                                        <path d="M0.305991111,0 L12.8122063,0 C13.6169641,-1.47831606e-16 14.2693492,0.652385079 14.2693492,1.45714286 L14.2693492,49.5428571 C14.2693492,50.3476149 13.6169641,51 12.8122063,51 L0.305991111,51 L0.305991111,51 L0.305991111,0 Z" id="Rectangle" fill={`url(#linearGradient-${this.gradientId}-2)`}/>
                                                        <path d="M10.324544,0 L12.8748223,0 C13.6795801,7.42129993e-17 14.3319651,0.652385079 14.3319651,1.45714286 L14.3319651,49.5428571 C14.3319651,50.3476149 13.6795801,51 12.8748223,51 L10.324544,51 L10.324544,51 L10.324544,0 Z" id="Rectangle" fill="#778994"/>
                                                    </g>
                                                    <g id="Group" transform="translate(0.619071, 14.000000)" fill="#F9F9F9">
                                                        <polygon id="Fill-3" points="30.6099053 17.2743749 15.7886344 17.4444332 15.2321509 17.4444332 0.0890538033 17.2781976 8.96555008 13.7695824 5.40304889 6.33407052 12.7060906 9.88117818 15.4200974 0.25 18.1171853 9.87773779 25.4503868 6.34783208 21.8507376 13.7695824"/>
                                                    </g>
                                                </g>
                                            </g>
                                            <g id="Group-34" transform="translate(9.037106, 20.000000)" fill="#E6DF9D">
                                                <path d="M5.22109675,1.22109675 C6.10363158,1.77345506 6.88026718,2.50407863 7.55100354,3.41296745 C9.35229817,5.85383191 10.5259855,8.09957088 11.0720656,10.1501843 C11.1431843,10.4170416 10.9844548,10.690995 10.717584,10.7620629 C10.6756043,10.7732421 10.6323468,10.7789033 10.5889041,10.7789033 L-0.0410451347,10.7789033 C-0.31723378,10.778987 -0.541128915,10.5550919 -0.541128915,10.2789033 C-0.541128915,10.2146973 -0.528764818,10.1510921 -0.504711963,10.0915617 C0.770856563,6.93455361 1.90293417,4.70814801 2.89152086,3.41234488 C3.57842044,2.51198215 4.35494573,1.7815661 5.22109675,1.22109675 Z" id="Triangle" transform="translate(5.221097, 6.000000) rotate(-90.000000) translate(-5.221097, -6.000000) "/>
                                            </g>
                                        </g>
                                        <rect id="Rectangle" fill="#FFFFFF" x="58.1280148" y="6.44230769" width="4.431283" height="4.42307692" rx="1"/>
                                        <rect id="Rectangle-Copy-4" fill="#FFFFFF" x="58.1280148" y="23.2884615" width="4.431283" height="4.42307692" rx="1"/>
                                        <rect id="Rectangle-Copy-9" fill="#FFFFFF" x="58.1280148" y="31.7115385" width="4.431283" height="4.42307692" rx="1"/>
                                        <rect id="Rectangle-Copy-8" fill="#FFFFFF" x="58.1280148" y="14.8653846" width="4.431283" height="4.42307692" rx="1"/>
                                        <rect id="Rectangle-Copy-5" fill="#FFFFFF" x="58.1280148" y="40.1346154" width="4.431283" height="4.42307692" rx="1"/>
                                    </g>
                                </g>
                            </g>
                        </g>
                    </g>
                </svg>
            </div>
        )
    }

    renderRectangleWeights() {
        const weights = [];
        for (let i = 0; i < 4; i++) {
            weights.push(
                <span key={i} className='rectangle-weight'></span>
            )
        }
        return weights;
    }
    
    renderMissleDetails() {
        return (
            <div className='missle-details'>                
                <div className='missle-details-header'>
                    <span className='header-item'>חנה / מטען</span>
                    <span className='header-item'>פגז</span>
                    <span className='header-item'>מרעום</span>
                </div>
                <div className='missle-details-row'>
                    <span className='header-item'>M4a2 4/7</span>
                    <span className='header-item'>נפיץ M107</span>
                    <span className='header-item'>הקשה M739</span>
                </div>
                <div className='missle-details-row'>
                    <span className='header-item'>2-96/79</span>
                    <span className='header-item'>{this.renderRectangleWeights()}</span>
                    <span className='header-item'>08.15</span>
                </div>
            </div>
        );
    }

    renderMissleChangableValues() {
        return (
            <div className='details-update-section'>
                <Input/>
                <Counter />
            </div>            
        );
    }

    getStageAdditionalDetails() {
        const isOpenClass = !this.state.isOpen ? 'hidden' : '';
        return (
            <div className={`plan-stage-additional-details ${isOpenClass}`}>
                {this.renderMissle()}
                {this.renderMissleDetails()}
                {this.renderMissleChangableValues()}
            </div>
        )
    }

    renderUpperSection() {
        const isCurrentClass = this.props.isCurrent ? 'current' : '';
        const isOpenClass = this.state.isOpen ? 'open' : '';
        return (
            <div className={`plan-stage-upper-section ${isCurrentClass}`}>
                <span className={`plan-stage-icon-wrapper ${isCurrentClass}`}>
                    <span className={'plan-stage-icon'}></span>
                </span>
                {this.renderDetails()}
                <span className={`plan-stage-extender ${isOpenClass}`} onClick={() => this.setState({isOpen: !this.state.isOpen})}></span>
                <span ref={this.moreActionBtnRef} className={'plan-stage-more-actions'} onClick={()=>this.setState({isContextMenuOpen: !this.state.isContextMenuOpen})}></span>
            </div>
        )
    }


    renderContextMenu() {
        if (this.state.isContextMenuOpen) {
            const xy = this.moreActionBtnRef.current.getClientRects();
            return (
                <ContextMenu top={xy[0].top} left={xy[0].left} onCloseContextMenu={()=>this.setState({isContextMenuOpen: false})}>
                    <div className={'BranchOption'} onClick={() => this.props.selectAllBranchesForTab('master')}>הפוך לנוכחי</div>
                    <div className={'BranchOption'} onClick={() => this.props.selectAllBranchesForTab('develop')}>Develop</div>
                </ContextMenu>
            )
        }
    }

    render() {        
    
        return (
            <div className={`plan-stage-wrapper`}>
                {this.renderUpperSection()}
                {this.getStageAdditionalDetails()}
                {this.renderContextMenu()}
            </div>
        )
    }
}

PlanStage.defaultProps = {
    isCurrent: false
  };