import React, { Component } from 'react';
import {ActivityDropdown, GoalDropdown} from './BMRDropdown';
import {CalculatorContext} from '../../../AppContext/ExportContexts';

export class TopRow extends Component {
  static contextType = CalculatorContext;

  render() {
    const {textareas} = this.props;
    const {textareas2} = this.props;
      return (
      <div className="userInfoRow">
        <div className="userInfoWrapper">
          <p className="userTraits">Sex</p>
          {textareas2[0]}
        </div> 
        <div className="userInfoWrapper">
          <p className="userTraits">Age</p>
          {textareas[0]}
        </div>
      </div>
    );
  }
}


export class MiddleRow extends Component {
  render() {
    const {textareas} = this.props;
    return (
      <div className="userInfoRow">
        <div className="userInfoWrapper">
          <p className="userTraits">Height</p>
          <div id="ftInWrapper">
            {textareas[1]}
            {textareas[2]}
          </div>
        </div>
        <div className="userInfoWrapper">
          <p className="userTraits">Weight</p>
          {textareas[3]}
        </div>
      </div>
    );
  }
}

export class BottomRow extends Component {
  render() {
    return (
      <div className="userInfoRow">
        <div className="userInfoWrapper">
          <p className="userTraits">Activity</p>
          <ActivityDropdown />
        </div>
        <div className="userInfoWrapper">
          <p className="userTraits">Goal</p>
          <GoalDropdown />
        </div>
      </div>
    );
  }
}
