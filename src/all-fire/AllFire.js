import React, { Component } from 'react';
import './AllFire.css';
import ParticipateCard, {participatesCardSize} from './MyParticipateCard';
import HeaderCard from './HeaderCard';
import MiniHeaderCard from './MiniHeaderCard';
import Counter, {counterTypes} from './ui-component/Counter/Counter';
import TabsBar from './TabsBar';
import lodash from 'lodash';
import Icon from './ui-component/Icon/Icon';
import {ValueSet} from './mock/Mock';
import {EntitiesMngr} from './mock/Mock';
import SwipeButton from './ui-component/SwipeButton/SwipeButton';

export const widgetSizes = {
    default: 'default',
    minimized: 'minimized'
}   

const paticipatesOptions = {
    my: 'my',
    other: 'other'
}   

export default class AllFire extends Component {

    state = {
        isAppLoading: true,
        mainEnt: null,
        widgetSize: widgetSizes.default,        
        openParticipates: paticipatesOptions.my,
        selectedParticipate: null,
        participatesInterval: null,
        participates: null,
        attackTypeDetailsModelResponse: null,
        selectedAttackType: null,
        selectedAttackTypeDetails: null,
        targetLengthCounter: null,
        targetAzimuthCounter: null,
        targetTimerCounter: null,
        selectedMissionType: null
    }

    ALLFIRE_BEHAVIOR_PATH = 'CommonX.allFire';

    componentDidMount() {
        fetch('./data/MissionEntity.json')
            .then(response => response.json())
            .then(data => {
                this.setState({
                    mainEnt: data,
                    isAppLoading: false
                });
            });
    }

    getEntityBehaviorData() {
        return lodash.get(this.state.mainEnt, this.ALLFIRE_BEHAVIOR_PATH);
    }

    componentWillUnmount() {
        if (this.state.participatesInterval) {
            clearInterval(this.state.participatesInterval);
        }
    }

    async handleParticipates(prevState) {
        if (this.state.mainEnt && this.state.mainEnt.CommonX.allFire.entityStateValue === 1) {
                const intervalInMilliSeconds = 
                this.state.mainEnt.CommonX && 
                    this.state.mainEnt.CommonX.allFire && 
                        this.state.mainEnt.CommonX.allFire.participatesRestIntervalInMilliSeconds;

            const restUrl = 
                this.state.mainEnt.CommonX && 
                    this.state.mainEnt.CommonX.allFire && 
                        this.state.mainEnt.CommonX.allFire.participatesRestQuerySname;
            
            // get my particaipates on initial load
            if (!prevState.mainEnt) {
                if (intervalInMilliSeconds && restUrl) {
                    clearInterval(this.state.participatesInterval);
                    this.fetchParticipates();
                    this.setState({
                        participatesInterval: setInterval(this.fetchParticipates, intervalInMilliSeconds)
                    })
                }
            // get my particaipates after click on back from external support   
            } else if (prevState.openParticipates === paticipatesOptions.other && 
                        this.state.openParticipates === paticipatesOptions.my) {
                            clearInterval(this.state.participatesInterval);
                            this.fetchParticipates();
                            this.setState({
                                participatesInterval: setInterval(this.fetchParticipates, intervalInMilliSeconds)
                            })
            } else if (prevState.openParticipates === paticipatesOptions.my && 
                this.state.openParticipates === paticipatesOptions.other) {
                    clearInterval(this.state.participatesInterval);
                    this.setState({
                        participatesInterval: null
                    })
            // fetch external support particiapates
            } else if ((this.state.selectedAttackType && 
                        this.isSelectedAttackTypeCodeChanged(prevState) && 
                            (!this.state.selectedAttackType.allowedValues || this.state.selectedAttackType.allowedValues.length === 0)) || 
                            (this.state.selectedAttackType && this.state.selectedAttackTypeDetails && this.state.selectedAttackTypeDetails !== prevState.selectedAttackTypeDetails)) {
                clearInterval(this.state.participatesInterval);
                this.fetchParticipates();
                this.setState({
                    participatesInterval: setInterval(this.fetchParticipates, intervalInMilliSeconds)
                })
            }
        }
    }

    isSelectedAttackTypeCodeChanged(prevState) {
        return prevState.selectedAttackType !== this.state.selectedAttackType
        /*return (!prevState.selectedAttackType && this.state.selectedAttackType) || 
                    (prevState.selectedAttackType && this.state.selectedAttackType && prevState.selectedAttackType.code !== this.state.selectedAttackType.code)*/
    }

    async fetchAttackTypeDetailsModelValues(prevState) {
        if (this.isSelectedAttackTypeCodeChanged(prevState)) {
            this.clearCounters();
            if (this.state.selectedAttackType && 
                    this.state.selectedAttackType.allowedValues && 
                        this.state.selectedAttackType.allowedValues.length > 0) {

                let modelResponse = 
                    await EntitiesMngr.getModelByVal(this.state.selectedAttackType.allowedValues,
                                                        this.state.mainEnt.CommonX.allFire.attackTypesDetailsModelSname);

                    if (modelResponse && !Array.isArray(modelResponse)) {
                        modelResponse = [modelResponse];
                    }

                    this.setState({attackTypeDetailsModelResponse: modelResponse})
            } else {
                this.setState({
                    selectedAttackTypeDetails: null,
                    attackTypeDetailsModelResponse: null
                });
            }
        }
    }

    clearCounters() {
        this.setState({
            targetLengthCounter: null,
            targetAzimuthCounter: null,
            targetTimerCounter: null
        });
    }

    componentDidUpdate(prevProps, prevState) {

        this.handleParticipates(prevState);
        this.fetchAttackTypeDetailsModelValues(prevState);
        //this.clearCounters();

    }

    fetchParticipates = () => {
        const {participatesRestQuerySname} = this.state.mainEnt.CommonX.allFire;
        const option = this.state.openParticipates === paticipatesOptions.my ? 1 : 2;
        const url = `${participatesRestQuerySname}${option}`;
        //Globals.get().clientFacade.exeRestQuary(participatesRestQuerySname, params);
        console.log('Fetching from URL', url)
        //fetch(url)
        fetch('./data/participates.json')
            .then(response => response.json())
            .then(data => {
                this.setState({participates: data.participates}, this.removeSelectionForNonExistingParticipate);
                //console.log(data);
            });
    }

    removeSelectionForNonExistingParticipate = () => {
        if (!this.state.selectedParticipate) return;

        const isSelectedInLatestResponse = this.state.participates.some(item => item.entityId === this.state.selectedParticipate); 
        if (!isSelectedInLatestResponse) {
            this.setState({selectParticipate: null})
        }
    }

    setWidgetSize = widgetSize => {
        this.setState({widgetSize})
    }

    changeMissionType = (currentCode) => {
        let nextCode = ++currentCode;
        const values = ValueSet.getLiterals({sname: this.state.mainEnt.CommonX.allFire.missionTypeValueSetSname})
        const keys = Object.keys(values);

        if (nextCode > keys.length) {
            nextCode = 1;
        }

        this.setState({selectedMissionType: nextCode});

    }

    renderHeaderAccordingToStatus(status) {        
        switch (status) {
            case 1:
            // mission status: initial
            case 3:
                return (
                    <HeaderCard 
                        entity={this.state.mainEnt}
                        setWidgetSize={this.setWidgetSize}/>
                )
            // mission status: confirm before send
            case 2:
            // mission status: confirm before fire
            case 4:
                return (
                    <MiniHeaderCard 
                        missionType={this.state.selectedMissionType || this.state.mainEnt.CommonX.allFire.missionType}
                        onButtonClick={this.changeMissionType}
                        entity={this.state.mainEnt}/>
                )
            case 3:
                return null;
            default:
                break;
        }
    }
    
    switchOpenParticipates = newparticipates => {
        this.setState({
            openParticipates: newparticipates,            
            selectedParticipate: null,            
            participates: null,
            attackTypeDetailsModelResponse: null,
            selectedAttackType: null,
            selectedAttackTypeDetails: null,
            targetLengthCounter: null,
            targetAzimuthCounter: null,
            targetTimerCounter: null            
        })
    }

    renderMySuggestedParticipatesButton() {
        if (this.state.openParticipates === paticipatesOptions.my) {
            return null;
        }
        return (
            <div className='all-fire-participates-button' onClick={() => this.switchOpenParticipates(paticipatesOptions.my)}>
                <Icon className='all-fire-my-participates-expand-btn' iconUri={require('./assets/arrow-down.svg')}/>
                <Icon className='all-fire-participates-logo' iconUri={require('./assets/tank.svg')}/>
                <span className={'label'}>{'שלי'}</span>
            </div>
        )
    }

    renderOtherSuggestedParticipatesButton() {
        if (this.state.openParticipates === paticipatesOptions.other) {
            return null;
        }
        return (
            <div className='all-fire-participates-button' onClick={()=>this.switchOpenParticipates(paticipatesOptions.other)}>
                <Icon className='all-fire-participates-logo' iconUri={require('./assets/changeWeapon.svg')}/>
                <span className={'label'}>{'סיוע אש'}</span>
                <Icon className='all-fire-other-participates-expand-btn' iconUri={require('./assets/arrow-down.svg')}/>
            </div>
        );
    }

    selectParticipate = (participateId) => {
        if (participateId === this.state.selectedParticipate) {
            this.setState({selectedParticipate: null})    
        } else {
            this.setState({selectedParticipate: participateId})
        }
    }

    renderSuggestedParticipatesList() {
        //const closedClass = this.state.openParticipates === paticipatesOptions.other ? 'closed' : ''
        const {participates} = this.state;
        let res = [];

        if (participates) {
            res = participates.map(item => {
                const data = {
                    bodyCardRightSectionMainIcon: item.mainIcon,                                        
                    bodyCardRightSectionTopRightIcon: item.seconaryIconTop,
                    bodyCardRightSectionMiddleRightIcon: item.seconaryIconBottom,
        
                    bodyCardMainSectionRow1Col1Text: item.mainText,
                    bodyCardMainSectionRow1Col2Text: item.secondaryText,
                    bodyCardMainSectionRow1Col3Text: item.infoText1,
                    bodyCardMainSectionRow1Col3TextColor: item.infoText1Color,
                    bodyCardMainSectionRow1Col3TextBGColor: item.infoText1BgColor,
                    bodyCardMainSectionRow1Col4Text: item.infoText2,
                    bodyCardMainSectionRow1Col4TextColor: item.infoText2Color,                    
                }
                return (
                    <ParticipateCard
                        key={item.entityId}
                        cardSize={this.state.openParticipates === paticipatesOptions.other ? participatesCardSize.small : participatesCardSize.medium}
                        isCanBeSelected={true}
                        isSelected={item.entityId === this.state.selectedParticipate}
                        onParticiapteClick={this.selectParticipate}
                        data={data}
                        id={item.entityId}                    
                />
                )}
            );
        }        

        return <div className={`all-fire-my-participates-wrapper`}>{res}</div>;
    }

    swipeEnd = e => {
        console.log(+e.target.value)
        if (+e.target.value >= +e.target.max) {
            //exectue command;
            console.log('success')
            e.target.value = 0
        } else {
            this.rafID = window.requestAnimationFrame(this.returnSwipeToStart);
        }

    }

    returnSwipeToStart = () => {    
        const inputRangeElement = document.getElementById('swipeInputId');

        if(inputRangeElement.value > 0) {
            inputRangeElement.value = inputRangeElement.value - 12;
            window.requestAnimationFrame(this.returnSwipeToStart);   
        }
    }


    renderSlideButtonOld() {
        return (
            <div className='command-slider-wrapper'>
                <input 
                    id='swipeInputId'
                    className='command-slider-input'
                    type='range' 
                    defaultValue='0' 
                    min='0' 
                    max='150'                    
                    onMouseUp={this.swipeEnd}
                    onTouchEnd={this.swipeEnd}
                />
                <span className='command-slider-description'>החלק לאישור ירי</span>
            </div>
        )
    }

    renderSlideButton() {
        return (
            <SwipeButton 
                text='החלק לאישור ירי'
                color='#F6EA75'
                onSuccess={()=>console.log('success')}
            />
        )
    }

    renderFooter() {
        return (
            <div className='all-fire-footer-wrapper'>
                <button className='all-fire-button' onClick={()=>console.log('cancel')}>{'בטל משימה'}</button>
                {/*this.renderSlideButtonOld()*/}
                {/* <button className='all-fire-button primary disabled'>{'אשר'}</button> */}
                {this.renderSlideButton()}
            </div>
        );
    }

    onAttackTypeClick = selectedAttackType => {
        let attackType = null;
        if (!this.state.selectedAttackType || (this.state.selectedAttackType.code !== selectedAttackType.code) ) {
            attackType = selectedAttackType
        }
        this.setState({selectedAttackType: attackType})
    }

    onAttackTypeDetailsClick = selectedAttackTypeDetails => {
        let attackTypeDetails = null;
        if (!this.state.selectedAttackTypeDetails || (this.state.selectedAttackTypeDetails.appX.model.value !== selectedAttackTypeDetails.appX.model.value) ) {
            attackTypeDetails = selectedAttackTypeDetails
        }
        this.setState({selectedAttackTypeDetails: attackTypeDetails})
    }

    renderAttackDetailsFirstRow() {
        const buttons = [];
        const valueSetLiterals = ValueSet.getLiterals({sname: this.state.mainEnt.CommonX.allFire.attackTypesValueSetSname});
        
        for (const literal in valueSetLiterals) {       
            const {code, icon, dispName} = valueSetLiterals[literal];
            buttons.push(
                <div 
                     title={dispName}
                     className={`attack-type-button ${this.state.selectedAttackType && this.state.selectedAttackType.code ===  code ? 'selected' : ''}`} 
                     onClick={() => this.onAttackTypeClick(valueSetLiterals[literal])}
                     key={code}>
                        <Icon className='attack-icon' iconUri={icon}/>
                        <span className='attack-description'>{dispName}</span>
                </div>
            )
        }
        return (
            <div className='external-assist-attack-first-row-wrapper'>
                {buttons}
            </div>
        )
    }

    renderAttackDetailsSecondRow() {
        const buttons = [];
        const {attackTypeDetailsModelResponse} = this.state;
        attackTypeDetailsModelResponse && attackTypeDetailsModelResponse.forEach(item => {
            buttons.push(
                <div 
                     title={item.appX.base.dispName}
                     className={`attack-type-details-button ${this.state.selectedAttackTypeDetails && this.state.selectedAttackTypeDetails.appX.model.value ===  item.appX.model.value ? 'selected' : ''}`} 
                     onClick={() => this.onAttackTypeDetailsClick(item)}
                     key={item.appX.model.value}>
                        <Icon className='attack-icon' iconUri={item.appX.base.icons && item.appX.base.icons[0]}/>
                        <span className='attack-description'>{item.appX.base.dispName}</span>
                </div>
            )
        })                 
        
        if (buttons.length === 0) return null;

        return (
            <div className='external-assist-attack-second-row-wrapper'>
                {buttons}
            </div>
        )
    }

    renderAttackDetails() {
        if (this.state.openParticipates === paticipatesOptions.other) {
            return (
                <>
                    {this.renderAttackDetailsFirstRow()}
                    {this.renderAttackDetailsSecondRow()}
                </>
            )
        }
        return null;
    }

    onCounterChange = (id, newValue) => {
        this.setState({[id]: newValue}, () => {
            // clear azimuth if length was cleared
            if (!this.state.targetLengthCounter && this.state.targetAzimuthCounter) {
                this.setState({targetAzimuthCounter: null})
            }
        });        
    }

    renderCounters() {
        const {selectedAttackType, selectedAttackTypeDetails} = this.state;

        if (selectedAttackType) {
            if (!selectedAttackType.allowedValues || 
                (selectedAttackType.allowedValues.length > 0 && selectedAttackTypeDetails)) {
                    return (
                        <div className='counters-wrapper'>
                            <div className='counters-row'>
                                <Counter 
                                    id={'targetLengthCounter'}
                                    valueChangger={200}
                                    title={'אורך מטרה'}
                                    type={counterTypes.lenght}
                                    onChange={this.onCounterChange}
                                    value={this.state.targetLengthCounter}
                                    emptyValue={'-'}
                                />
                                <Counter 
                                    id={'targetAzimuthCounter'}
                                    valueChangger={10}
                                    title={'אזימוט מטרה'}
                                    type={counterTypes.azimuth}
                                    onChange={this.onCounterChange}
                                    value={this.state.targetAzimuthCounter}
                                    emptyValue={'-'}
                                    isReadonly={!this.state.targetLengthCounter}
                                />
                            </div>
                            <div className='counters-row'>
                                <Counter 
                                    isMandatory={true}
                                    title={'משך'}
                                    valueChangger={1}
                                    type={counterTypes.timer}
                                    onChange={this.onCounterChange}
                                    id={'targetTimerCounter'}
                                    value={this.state.targetTimerCounter}
                                    emptyValue={'00:00'}
                                />
                            </div>
                        </div>
                    )

                }
        }
        return null;
    }

    renderComponentBodyDraft() {
        return(
            <>
                {this.renderAttackDetails()}
                {this.renderCounters()}
                {this.renderSuggestedParticipatesList()}
                {this.renderOtherSuggestedParticipatesButton()}
                {this.renderMySuggestedParticipatesButton()}
            </>
        )
    }

    renderMissionParticipate() {

        const data = {...this.getEntityBehaviorData()};

        data.bodyCardRightSectionBottomIcon = ValueSet.getValue({sname: data.safetyValueSetSname}, data.safetyType).icon;
        data.bodyCardRightSectionBottomText = ValueSet.getValue({sname: data.safetyValueSetSname}, data.safetyType).dispName;
        data.bodyCardRightSectionBottomTextColor = ValueSet.getValue({sname: data.safetyValueSetSname}, data.safetyType).color;

        return (
                <ParticipateCard                    
                    isCanBeSelected={false}                    
                    isSelected={false}                    
                    data={data} 
                    isEditable
                    cardSize={participatesCardSize.large}                   
                />
        );
    }

    renderTabsBar() {
        return (
            <TabsBar />
        )
    }

    renderComponentBodyAccordingToStatus(status) {        
        switch (status) {
            // mission status: initial
            case 1:
                return this.renderComponentBodyDraft();
            // mission status: confirm before send
            case 2:
            // mission status: confirm before fire
            case 4:
                // dont forget to remove interval
                return this.renderMissionParticipate();
            case 3:
                const body = (
                    <>
                        {this.renderMissionParticipate()}
                        {this.renderTabsBar()}
                    </>
                )    
                return body;
            default:
                break;
        }
    }

    showOverlayAccordingToStatus(status) {
        switch (status) {            
            // mission status: confirm before send                
            case 2:
            // mission status: confirm before fire
            case 4:
                return <div className='popup-overlay'></div>;
            default:
                return null;
        }        
    }

    render() {
        if (this.state.isAppLoading) {
            return null;
        }
        const status = this.state.mainEnt.CommonX.allFire.entityStateValue;
        return (
            <div className='all-fire-wrapper'>
                {this.showOverlayAccordingToStatus(status)}
                {this.renderHeaderAccordingToStatus(status)}
                {this.renderComponentBodyAccordingToStatus(status)}
                {this.renderFooter()}
            </div>
        )
    }
}
