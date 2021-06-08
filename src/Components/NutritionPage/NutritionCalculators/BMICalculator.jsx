import React, { Component } from "react";
import { CalculatorContext } from "../../../AppContext/ExportContexts";
import "./BMI.css";

class BMI extends Component {
  constructor() {
    super();

    this.state = {
      feet: "",
      inches: "",
      weight: "",
    };

    this.changeFeet = this.changeFeet.bind(this);
    this.changeInches = this.changeInches.bind(this);
    this.changeWeight = this.changeWeight.bind(this);
    this.computeBMI = this.computeBMI.bind(this);
  }

  changeFeet(event) {
    this.setState({
      feet: event.target.value,
    });
  }

  changeInches(event) {
    this.setState({
      inches: event.target.value,
    });
  }

  changeWeight(event) {
    this.setState({
      weight: event.target.value,
    });
  }

  computeBMI() {
    var inchesInFoot = 12;
    var height = Number(this.state.feet);
    var weight = this.state.weight;

    if (this.state.feet && this.state.inches && this.state.weight) {
      height *= inchesInFoot;
      height += Number(this.state.inches);
      var bmiFormula = (weight / (height * height)) * 703;
      bmiFormula = bmiFormula.toFixed(1);
      return bmiFormula;
    }
  }

  getBMI(bmiNum) {
    var bmiOfUser = {
      label: "",
    };

    if (bmiNum < 18.5) {
      bmiOfUser.label = "Category: Underweight";
    } else if (bmiNum === 18.5 || bmiNum < 25.0) {
      bmiOfUser.label = "Category: Normal/Healthy Weight";
    } else if (bmiNum === 25.0 || bmiNum < 30) {
      bmiOfUser.label = "Category: Overweight";
    } else if (bmiNum >= 30) {
      bmiOfUser.label = "Category: Obese";
    } else {
      bmiOfUser.label = "Your BMI is: ";
    }

    return bmiOfUser;
  }

  static contextType = CalculatorContext;

  render() {
    var bmiNum = this.computeBMI();
    var userBMI = this.getBMI(bmiNum);

    return (
      <div className="container">
        <div className="text-box">
          <div className="calc">
            <h1>BMI (Body Mass Index) Calculator</h1>
          </div>
          <div className="text-2">
            <p>Please enter your height and weight:</p>
          </div>
        </div>
        <div className="text-box">
          <div className="text">
            <form>
              <div className="form-div">
                <legend>Your Height:</legend>
                <div className="text-box">
                  <div className="input-div">
                    <input
                      className="form-control"
                      id="feet"
                      type="number"
                      min="1"
                      max="12"
                      value={this.state.feet}
                      onChange={this.changeFeet}
                    />
                    <label className="form-label" htmlFor="feet">
                      (feet)
                    </label>
                  </div>
                  <div className="input-div">
                    <input
                      className="form-control"
                      id="inches"
                      type="number"
                      min="0"
                      max="12"
                      value={this.state.inches}
                      onChange={this.changeInches}
                    />
                    <label className="form-label" htmlFor="inches">
                      (inches)
                    </label>
                  </div>
                </div>
              </div>

              <div className="form-div">
                <legend>Your Weight:</legend>
                <div className="text-box">
                  <div className="input-weight-div">
                    <input
                      className="form-control"
                      id="weight"
                      type="number"
                      min="1"
                      max="980"
                      value={this.state.weight}
                      onChange={this.changeWeight}
                    />
                    <label className="form-label" htmlFor="weight">
                      (pounds)
                    </label>
                  </div>
                </div>
              </div>
            </form>
          </div>

          <div className="display-div">
            <BmiDisplay bmiNum={bmiNum} label={userBMI.label} />
          </div>
        </div>
      </div>
    );

    function BmiDisplay(props) {
      return (
        <div className={"bmi-calculation "}>
          <div>{props.bmiNum}</div>
          <div>{props.label}</div>
        </div>
      );
    }
  }
}

export default BMI;
