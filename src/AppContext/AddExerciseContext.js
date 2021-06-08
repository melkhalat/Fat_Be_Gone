import React, { Component } from 'react';

export const AddExerciseContext = React.createContext();

export class AddExerciseProvider extends Component {

  GetExerciseTypes = () => {
    fetch('/workout/getExerciseTypes')
      .then(res => res.json())
      .then(data => {
        this.setState({
          muscles: data.Muscles,
          types: data.EType
        })
     })
  }

 
  ResetCategories = () => {
    document.getElementsByClassName('AeViews')[0].textContent = 'Muscles';
    document.getElementsByClassName('AeViews')[1].textContent = 'Type';
  }

  SearchByCategory = () => {
    let bodyPart = document.getElementsByClassName('AeViews')[0].textContent;
    let eType = document.getElementsByClassName('AeViews')[1].textContent;
    let muscles = bodyPart === 'Muscles' ? '' : `muscle=${bodyPart}&`
    let type = eType === 'Type' ? '' : `type=${eType}`
    let uri = encodeURI('/workout/getExerciseByCategory?' + muscles + type);
    fetch(uri)
      .then(res => res.json())
      .then(data => {
        console.log(data);
        let showFavorite;
        if(this.state.showFavorite){
          showFavorite = false;
        } 
        this.setState( {
          exercises: data,
          showFavorite
        })
      })
  }

  SearchExercise = (e) => {
    if (e.key === "Enter"){
      e.preventDefault();
      let search = e.target.value;
      let uri = encodeURI(`/workout/getExerciseBySearch/${search}`);
      fetch(uri)
        .then(res => res.json())
        .then(data => {
          console.log(data);
          let showFavorite;
          if(this.state.showFavorite){
            showFavorite = false;
          } 
          this.setState({
            exercises: data,
            showFavorite
          })
       })
       document.getElementsByClassName('AeViews')[0].textContent = 'Muscles';
       document.getElementsByClassName('AeViews')[1].textContent = 'Exercise Types';
    }
  }

  ShowValue = (e, index) => {
    document.getElementsByClassName('AeViews')[index].childNodes[0].textContent = e.target.textContent;
    this.SearchByCategory();
  }

  componentDidMount(){
    this.GetExerciseTypes();
  }

  state = {
    exercises: [],
    muscles: [],
    types: [],
    showFavorite: false
  }

  render() {
    const {state, ...methods} = this;
    return (
      <AddExerciseContext.Provider value={{...methods, ...state }}>
        {this.props.children}
      </AddExerciseContext.Provider>
    );
  }
}
