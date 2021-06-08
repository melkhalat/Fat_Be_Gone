import React, { Component } from 'react';
import {NutritionContext, CalculatorContext} from '../../../AppContext/ExportContexts';

class NutritionView extends Component {
  render() {
    return (
      <NutritionContext.Consumer>
        { ({ calories }) => (
          <CalculatorContext.Consumer>
            { ({ Calories }) => (
              <div id="NutritionView">
                <p><span>Today's Goal: {Calories}</span></p>
                <p><span>Calories Consumed: {calories}</span></p>
              </div>
            )}
          </CalculatorContext.Consumer>
        )}
      </NutritionContext.Consumer>
    );
  }

}

export default NutritionView;
