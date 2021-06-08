import React, { Component } from "react";
import { Link } from "react-router-dom";
import { WorkoutContext } from "../../../AppContext/ExportContexts";


class WorkoutButtons extends Component {
  render() {
    const { collection, documentID, workoutIndex } = this.props;
    return (
      <WorkoutContext.Consumer>
        {({

          ChangeWorkoutDate,
          DeleteCurrentRoutine,
          GetWorkoutByIndex,
          SaveWorkout,
          tab,
        }) => (
          <div id="WoBtnsWrapper">
          <button className="WoBtns"  onClick={() => SaveWorkout(workoutIndex)}  >

            Save

          </button>

          

          
            <Link to={`/workout/routineview/${collection}/${documentID}`}
             onClick={() =>

              collection !== "routines"
                ? GetWorkoutByIndex(workoutIndex)
                : null

            }
            
            >

            <button id="EDITbtn">Edit</button>

              

              </Link>



            <button className="WoBtns"  onClick={() => DeleteCurrentRoutine(documentID)}>

              Delete

            </button>

          </div>

        )}

      </WorkoutContext.Consumer>

    );

  }

}

export default WorkoutButtons;