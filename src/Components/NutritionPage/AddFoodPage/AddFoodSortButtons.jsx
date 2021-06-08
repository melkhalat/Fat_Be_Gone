import React, { Component } from 'react';
import {AddFoodContext} from '../../../AppContext/ExportContexts';

class AddFoodSortButtons extends Component {
  render() {
    return (
      <AddFoodContext.Consumer>
        { ({ GetFavorites, GetRecents }) => (
          <div id="AddFoodButtonWrapper">
          </div>
        )}
      </AddFoodContext.Consumer>
    );
  }
}

export default AddFoodSortButtons;
