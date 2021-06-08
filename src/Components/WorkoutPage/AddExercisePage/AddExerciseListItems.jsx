import React, { Component } from 'react';
import {WorkoutContext} from '../../../AppContext/ExportContexts';

class AddExerciseItem extends Component {

  render() {
    const {name, type, muscle} = this.props;
    return (
      <WorkoutContext.Consumer>
        { ({ AddExercise, FavoriteExercise }) => (
          <div className="AddExerciseItem">
            <p>{name} ({muscle})({type})</p>
            <div className="AddExerciseCheckboxWrapper">
              <div
                className="AddExerciseCheckBox"
                title="Click to add food"
                onClick={(e) => AddExercise(e, {...this.props})}>
              </div>
            </div>
          </div>
        )}
      </WorkoutContext.Consumer>
    );
  }

}

export default AddExerciseItem;
