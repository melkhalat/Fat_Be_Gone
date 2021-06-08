import React, { Component } from 'react';

import {Link} from 'react-router-dom';

import StoriesList from './StoriesList';

import StoryModal from './StoryModal';

import StorySubmission from './StorySubmission';

import {StoryContext} from '../../AppContext/ExportContexts';



class Story extends Component {

  render() {

    return (

      <StoryContext.Consumer>

        { ({showModal}) => (
          

          <div>
            <Link 
            to="/nutrition"
            >

            <button id="nutritionBTN"> 
            Nutrition

              </button>

            </Link>

            <Link 
            to="/workout"
            >

            <button id="workoutBTN"> 
            Exercise

              </button>

            </Link>


        <div id="Story">

          
          

          <div id="StoryTimeline">

            <StorySubmission />

            <StoriesList />

            

          </div>
          

          { showModal ? <StoryModal/> : null }

        </div>
        </div>

      )}

      </StoryContext.Consumer>

    );

  }

}



export default Story;