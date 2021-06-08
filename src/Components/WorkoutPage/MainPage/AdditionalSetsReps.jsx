import React, { Component } from 'react';
import DeleteBtn from '../../../assets/delete-food-button.svg';
import {WorkoutContext} from '../../../AppContext/ExportContexts';

class AdditionalSetsReps extends Component {
  static contextType = WorkoutContext;

  InputValidation = (e) => {
    let placeholder = e.target.placeholder;
    let input = parseInt(e.key);
    if(placeholder !== "type" && e.key !== '.' && isNaN(input)){
      e.preventDefault()
      alert("Numbers only please!")
    }
  }

  render() {
    const {exerciseIndex, setIndex, sets, workoutIndex}  = this.props;
    const {DeleteSet, SaveSetValues} = this.context;
    const setValues = [
      { "placeholder": "mins", "value": sets.Weight, "maxLength": 2},
      { "placeholder": "cals", "value": sets.Reps, "maxLength": 3}
    ]
    const setCategories = setValues.map( item =>
      <textarea
        key={item.placeholder}
        className="CurrentRoutineValues"
        placeholder={item.placeholder}
        value={item.value}
        onChange={ (e) => SaveSetValues(e, workoutIndex, exerciseIndex, setIndex)}
        onKeyPress={this.InputValidation}
        maxLength={item.maxLength}
       />
    )
    return (
        <div className="CurrentRoutineSetsReps">
          
          {setCategories}
          
        </div>
    );
  }
}

export default AdditionalSetsReps;
