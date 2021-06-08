import React, { Component } from 'react';
import {AddFoodContext} from '../../../AppContext/ExportContexts';

class AddFoodItem extends Component {
  render() {
    const {description, fdcId} = this.props;
    return (
      <AddFoodContext.Consumer>
        { ({ AddFood, FavoriteFood }) => (
          <div className="AddFoodItem">
            <p>{description}</p>
            <div id="AddFoodCheckboxWrapper">
              <div
                className="AddFoodCheckBox"
                title="Click to add food"
                onClick={(e) => AddFood(description, fdcId, e)}>
              </div>
            </div>
          </div>
        )}
      </AddFoodContext.Consumer>
    );
  }

}

export default AddFoodItem;
