import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import RoutineDropdown from './WorkoutRoutineDropdown.jsx';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import {WorkoutContext} from '../../../AppContext/ExportContexts';

class WorkoutDropdownWrapper extends Component {
  static contextType = WorkoutContext;
  componentDidMount() {
    const datePickers = document.getElementsByClassName("react-datepicker__input-container");
    Array.from(datePickers).forEach((el => el.childNodes[0].setAttribute("readOnly", true)))
  }
  render() {
    return (
      <WorkoutContext.Consumer>
        { ({ ChangeWorkoutDate, savedWorkouts, workoutDate }) => (
          <div id="WoWrapper">
              <DatePicker
                selected={new Date(workoutDate)}
                onChange={(e) => ChangeWorkoutDate('Date', e)}
                onSelect={(e) => ChangeWorkoutDate('Date', e)}
                className="WoViews"
                title="DatePicker"
                withPortal
                utcOffset
                highlightDates={savedWorkouts}
                todayButton="Refresh"
              />
            <RoutineDropdown />
            <Link
              to="/workout/routineview/routines/new">
              <button
                className="WoViews">
                Create Today's Routine
              </button>
            </Link>
          </div>
        )}
      </WorkoutContext.Consumer>
    );
  }

}

export default WorkoutDropdownWrapper;
