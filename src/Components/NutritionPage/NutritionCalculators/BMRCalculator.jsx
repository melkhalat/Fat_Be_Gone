import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import {TopRow, MiddleRow, BottomRow} from './BMRRows';
import {CalculatorContext} from '../../../AppContext/ExportContexts';
import './BMR.css';

class BMRCalculator extends Component {
state = {
    categories: [
      { name: "age", defaultValue: "Age", length: 2 },
      { name: "feet", defaultValue: "ft", length: 1 },
      { name: "inches", defaultValue: "in", length: 2 },
      { name: "weight", defaultValue: "lbs", length: 3 }
    ],
    categories2: [
      { name: "sex", defaultValue: "M/F", length: 1 }
    ]
  }

  static contextType = CalculatorContext;

  render() {
    const {SaveUserInfo} = this.context;
    const textareas = this.state.categories.map( item =>
      <textarea
        key={item.name}
        id={item.name}
        className="userTraitsAnswer"
        placeholder={item.defaultValue}
        onKeyPress={(e) => e.key === 'Enter' ? e.preventDefault() : null}
        onChange={(e) => SaveUserInfo(e)}
        maxLength={item.length}>
      </textarea>
    )
    const textareas2 = this.state.categories2.map( item =>
    <CalculatorContext.Consumer>
        { ({sex}) => (
        <textarea
        key={item.name}
        id={item.name}
        className="userTraitsAnswer"
        placeholder={sex}
        onKeyPress={(e) => e.key === 'Enter' ? e.preventDefault() : null}
        onChange={(e) => SaveUserInfo(e)}
        maxLength={item.length}>
        </textarea> 
     ) }
     </CalculatorContext.Consumer>
    )

    return (
      <CalculatorContext.Consumer>
        { ({ BMR, CalculateBMR, sex, showModal, StoreBMR }) => (
          <div id="BMRCalculator">
            <BMRTitle />
            <div id="userInfoOuter">
              <TopRow
                textareas2={textareas2}
                textareas={textareas}/>
              <MiddleRow
                textareas={textareas}/>
              <BottomRow
                textareas={textareas}/>
            </div>
            <p
              id="BMRValue"
              className="userTraits">
              Calories: {BMR}
            </p>
            <div id="BMRButtonWrapper">
              <button
                className="BMRButton"
                id="BMRCalculateBtn"
                onClick={CalculateBMR}>
                  <Link to="/nutrition" id="bmrButton">
                Calculate
                </Link>
              </button>
            </div>
          </div>
        )}
      </CalculatorContext.Consumer>
    );
  }
}

export default BMRCalculator;

class BMRTitle extends Component {
  render() {
    return (
      <div id="BMRHeader">
        <h1>Please enter your information to calculate your daily caloric needs:</h1>
      </div>
    );
  }
}
