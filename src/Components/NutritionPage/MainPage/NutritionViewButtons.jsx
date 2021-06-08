import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import {NutritionContext} from '../../../AppContext/ExportContexts';

class NutritionViewButtons extends Component {
  componentDidMount() {
    const datePickers = document.getElementsByClassName("react-datepicker__input-container");
    Array.from(datePickers).forEach((el => el.childNodes[0].setAttribute("readOnly", true)))
  }
  render() {
    return (
      <NutritionContext.Consumer>
        { ({ ChangeNutritionDate, nutritionDate, ToggleTotals }) => (
          <div id="NVButtonsWrapper">

            <div className="NVInnerWrapper2">
              <DatePicker
                selected={nutritionDate}
                onSelect={(e) => ChangeNutritionDate(e)}
                onChange={(e) => ChangeNutritionDate(e)}
                className="NVButtons"
                withPortal
                utcOffset
                todayButton="Refresh"
                />
              
            </div>

            <div className="NVInnerWrapper">
              <Link
                to="/nutrition/bmrcalculator"
                className="NVButtons">
                Click here to calculate your daily calorie goal
              </Link>
              
            </div>

            <Link to="/nutrition/bmicalculator" className="NVButtonsBMI">
                Click here to calculate your BMI
              </Link>

          </div>
        )}
      </NutritionContext.Consumer>
    );
  }

}

export default NutritionViewButtons;
