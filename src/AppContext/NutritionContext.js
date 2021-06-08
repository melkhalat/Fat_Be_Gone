import React, { Component } from "react";
import { CalculatorContext } from "./CalculatorContext";

export const NutritionContext = React.createContext();

export class NutritionProvider extends Component {
  CalculateNutritionInfoAdd = () => {
    let meals = ["Breakfast", "Lunch", "Dinner", "Snacks"];
    let { reports, calories } = this.state;
    let nutrients = {};
    meals.forEach((meal) => {
      this.state[meal].forEach((item) => {
        nutrients = this.FillNutrients(nutrients, reports[item.fdcId]);
      });
    });
    console.log(nutrients);
    let nutrientList = Object.keys(nutrients).map((item) => nutrients[item]);
    console.log(nutrientList);
    let empty = nutrientList.length === 0 ? true : false;
    var amount = 0;
    for (var i = 0; i < nutrientList.length; i++) {
      if (nutrientList[i].unitName === "kcal") {
        amount = nutrientList[i].amount;
      }
    }
    amount = amount + calories;
    console.log(calories);
    console.log(amount);
    this.setState({
      calories: amount,
      nutrients,
    });
  };

  CalculateNutritionInfoDelete = () => {
    let meals = ["Breakfast", "Lunch", "Dinner", "Snacks"];
    let { reports, calories } = this.state;
    let nutrients = {};
    meals.forEach((meal) => {
      this.state[meal].forEach((item) => {
        nutrients = this.FillNutrients(nutrients, reports[item.fdcId]);
      });
    });
    console.log(nutrients);
    let nutrientList = Object.keys(nutrients).map((item) => nutrients[item]);
    console.log(nutrientList);
    let empty = nutrientList.length === 0 ? true : false;
    var amount = 0;
    
    for (var i = 0; i < nutrientList.length; i++) {
      if (nutrientList[i].unitName === "kcal") {
        calories = nutrientList[i].amount;
      }
    }

    amount = calories - amount;
    console.log(calories);
    console.log(amount);
    this.setState({
      calories: amount,
      nutrients,
    });
  };

  ChangeNutritionDate = (nutritionDate) => {
    this.setState(
      {
        nutritionDate,
      },
      function () {
        this.FetchFood();
      }
    );
  };

  DeleteFood = (meal, ndbno) => {
    let options = { month: "2-digit", day: "2-digit", year: "numeric" };
    let date = this.state.nutritionDate.toLocaleDateString("en-US", options);
    let requestObject = {
      date,
      meal,
      ndbno,
    };
    let confirm = window.confirm("Delete this item?");
    if (confirm) {
      this.setState(
        (prevState) => ({
          [meal]: prevState[meal].filter((food) => {
            return food.ndbno !== ndbno;
          }),
        }),
        function () {
          this.CalculateNutritionInfoDelete();
        }
      );
      fetch("/nutrition/deleteFood", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestObject),
      });
    }
  };

  FetchFood = () => {
    let { nutritionDate } = this.state;
    let options = { month: "2-digit", day: "2-digit", year: "numeric" };
    let date = nutritionDate.toLocaleDateString("en-US", options);
    let regex = /\//g;
    let dateParam = date.replace(regex, "%2F");
    let uri = `/nutrition/getFood/${dateParam}`;
    fetch(uri)
      .then((response) => response.json())
      .then((data) => {
        if (data) {
          let ndbno_list = "";
          for (let meal in data) {
            ndbno_list = this.GetNDBNO(data[meal], ndbno_list);
          }
          this.setState({
            Breakfast: data.Breakfast,
            Lunch: data.Lunch,
            Dinner: data.Dinner,
            Snacks: data.Snacks,
            ndbno_list,
          });
          if (ndbno_list !== "") {
            this.FetchReports();
          } else {
            this.ResetState();
          }
        }
        else {
          fetch("/nutrition/createNutritionDocument", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ date }),
          });
          this.ResetState();
        }
      });
  };

  FetchReports = () => {
    let uri = encodeURI(
      `https://api.nal.usda.gov/fdc/v1/foods?api_key=eVJvhpdGCWaX1Ses0JZnFv4CdI9TkBoMRSoycnCd&${this.state.ndbno_list}`
    );
    fetch(uri, {
      mode: "cors",
    })
      .then((res) => res.json())
      .then((data) => {
        let reports = {};
        data.forEach((item) => {
          reports[item.fdcId] = item.foodNutrients;
        });
        this.setState(
          {
            reports,
          },
          function () {
            this.CalculateNutritionInfoAdd();
          }
        );
      });
  };

  FillNutrients = (nutrients, foodNutrients) => {
    let arr = [];
    foodNutrients.forEach((nutrient) => {
      let { name, amount, unitName } = nutrient;
      if (nutrient[name]) {
        nutrients[name].name = nutrient.nutrient.name;
        nutrients[name].amount = amount;
        nutrients[name].unitName = nutrient.nutrient.unitName;
      } else {
        nutrients[name] = {
          name: nutrient.nutrient.name,
          amount,
          unitName: nutrient.nutrient.unitName,
        };
      }
      arr.push(nutrients[name]);
    });
    return arr;
  };

  GetNDBNO = (meal, ndbno_list) => {
    meal.forEach((item) => {
      let ndbno = "fdcIds=" + item.fdcId + "&";
      if (ndbno_list.indexOf(ndbno) === -1) {
        ndbno_list += ndbno;
      }
    });
    return ndbno_list;
  };

  ResetState = () => {
    this.setState(
      {
        Breakfast: [],
        Lunch: [],
        Dinner: [],
        Snacks: [],
        ndbno_list: "",
        reports: {},
      },
      function () {
        this.CalculateNutritionInfoAdd();
      }
    );
  };

  SaveServing = (meal, ndbno, inputElement) => {
    let servings = inputElement.value;
    let options = { month: "2-digit", day: "2-digit", year: "numeric" };
    let date = this.state.nutritionDate.toLocaleDateString("en-US", options);
    if (servings !== "") {
      let requestObject = {
        date,
        meal,
        ndbno,
        servings,
      };
      fetch("/nutrition/updateServings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestObject),
      }).catch((err) => console.error(err));
    }
  };

  ToggleTotals = () => {
    this.setState(
      (prevState) => ({
        showTotals: !prevState.showTotals,
      }),
      function () {
        let { showTotals } = this.state;
        document.body.style.overflow = showTotals ? "hidden" : "auto";
      }
    );
  };

  UpdateServings = (e, meal, ndbno) => {
    let serving = e.target.value;
    let currentMeal = this.state[meal];
    if (isNaN(serving)) {
      e.target.value = 1;
      serving = 1;
      alert("Please enter valid numbers only!");
    }
    for (let i = 0; i < currentMeal.length; i++) {
      if (currentMeal[i].ndbno === ndbno) {
        currentMeal[i].servings = serving;
        break;
      }
    }
    this.setState(
      {
        currentMeal,
      },
      function () {
        this.CalculateNutritionInfoAdd();
      }
    );
  };

  componentDidMount() {
    if (window.location.pathname !== "/") {
      this.FetchFood();
    }
  }

  state = {
    nutritionDate: new Date(),
    Breakfast: [],
    Lunch: [],
    Dinner: [],
    Snacks: [],
    reports: {},
    ndbno_list: "",
    calories: 0,
    protein: 0,
    fat: 0,
    carbs: 0,
    showTotals: false,
    nutrientList: [],
  };

  render() {
    const { state, ...methods } = this;
    return (
      <CalculatorContext.Consumer>
        {(context) => (
          <NutritionContext.Provider
            value={{ ...context, ...methods, ...state }}
          >
            {this.props.children}
          </NutritionContext.Provider>
        )}
      </CalculatorContext.Consumer>
    );
  }
}
