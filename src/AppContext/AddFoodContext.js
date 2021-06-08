import React, { Component } from 'react';
import {NutritionContext} from './ExportContexts';

export const AddFoodContext = React.createContext();

export class AddFoodProvider extends Component {
  static contextType = NutritionContext;

  AddFood = (brandOwner, fdcId, e) => {
      let checkbox = e.target.style;
      let newState;
      if (checkbox.backgroundColor === "" || checkbox.backgroundColor === "white"){
        checkbox.backgroundColor = '#1F0CAD';
        newState = [{"name": brandOwner, "fdcId": fdcId, "servings" : 1}];
        this.setState(previousState => ( {
          FoodAdded: previousState.FoodAdded.concat(newState)
        } ))
      }
      else {
        checkbox.backgroundColor = "white";
        newState = this.state.FoodAdded.filter((foods) => {
          return foods.brandOwner !== brandOwner
        })
        this.setState(previousState => ( {
          FoodAdded: newState,
        } ))
      }
    }

  

  GetRecents = () => {
    fetch('/nutrition/getRecents')
      .then(res => res.json())
      .then(data => {
        let results = {};
        for (let meal in data[0]){
          let mealName = data[0][meal];
          if(mealName.length !== 0){
            for(let i = 0; i < mealName.length; i++){
              results[mealName[i].name] = mealName[i]
            }
          }
        }
        let FoodSearch = Object.keys(results).map(item => {
          return results[item]
        });
        this.setState({
          FoodSearch,
          FoodAdded: [],
          showFavorite: false
        }, 
        
        )
      })
  }

  

  SearchFood = e => {
    let search = e.target.value;
    if(e.key === 'Enter' && search !== ''){
      e.preventDefault();
      let uri = encodeURI(`https://api.nal.usda.gov/fdc/v1/foods/search?api_key=eVJvhpdGCWaX1Ses0JZnFv4CdI9TkBoMRSoycnCd&query=${search}`)
      fetch(uri)
        .then(response => response.json())
        .then(data => {
          if (data.foods === undefined){
            alert("We are unable to find the food you were searching for. Please enter another item!")
          }
          else{
            this.setState({
              FoodSearch: data.foods
            }, 
            
            )
          }
        })
      }
    }

  StoreFood = (nutritionDate, currentMeal) => {
    let {FoodAdded} = this.state;
    let options = {month: "2-digit", day: "2-digit", year: "numeric"};
    let date = nutritionDate.toLocaleDateString("en-US", options);
    let requestObject = {
      "date": date,
      "meal": currentMeal,
      "FoodAdded": FoodAdded
    }

    if(FoodAdded.length > 0 && currentMeal !== ""){
      fetch('/nutrition/insertFood', {
        method: 'POST',
        mode: 'same-origin',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestObject)
      })
        .then(res => res.json())
        .then(data => {
          this.context.FetchFood();
        })
        .catch(err => console.log(err))
    }
  }

  state = {
    FoodAdded: [],
    FoodSearch: [],
    showFavorite: false
  }

  render() {
    const {state, ...methods} = this;
    return (
      <NutritionContext.Consumer>
        {({ FetchFood  }) => (
          <AddFoodContext.Provider value ={{...methods, ...state, FetchFood}}>
            {this.props.children}
          </AddFoodContext.Provider>
        )}
      </NutritionContext.Consumer>
    );
  }

}
