import React, { Component } from 'react';
import FoodItem from './AddFoodItem.jsx';
import {AddFoodContext} from '../../../AppContext/ExportContexts';

class AddFoodItemList extends Component {
  static contextType = AddFoodContext;
  render() {
    var listItems = this.context.FoodSearch.map((foods) =>
      <FoodItem
        key={foods.fdcId}
        description={foods.description}
        fdcId={foods.fdcId}
      />
    );

    return (
      <div id="AddFoodItemList">
        {listItems}
      </div>
    );
  }

}

export default AddFoodItemList;
