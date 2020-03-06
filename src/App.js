import React, {useEffect, useState} from 'react'; 
import Recipe from './Recipe';
import './App.css';
import Chart from "react-google-charts";


const App = () => {

  //this part of the code containes the ID and KEY we got from the API
  //basically this is the pass to the API, when we call it, it will know who is making the request
  const APP_ID ="3d9e2374";
  const APP_KEY ="aa0aa56874b38d522ff4560ef38307dd";

  //useState basically adds a state to our funtional components
  //this means that our recipes, search, and query have an initial state
  //and a separate response state when we submit a request to the API
  /*
  function Example() {
  // Declare a new state variable, which we'll call "count"
  const [count, setCount] = useState(0); 
  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}   *notes from https://reactjs.org/docs/hooks-state.html
   */
  const [recipes, setRecipes] = useState([]);//taking state and pass it down to the props in line 67, and pass the component to Recipe.js 
  const [search, setSearch] = useState("");
  const [query, setQuery] = useState('vegan');
  const [infographic,setInfographic]= useState([]);

  //only when the query is called can we make a request
  useEffect(() => {
    getRecipes();
    console.log("Effect has been run");
  }, [query]); 

  //this is where we have the link to our API and we can call for it
  //then we wait for a response and fetch the data
  //then we put that data into a json format

  const getRecipes = async () => {
    const response = await fetch(
      `https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`
    );
    console.log("response", response)
    const data = await response.json();
    console.log("data", data)
    setRecipes(data.hits);
    // console.log(data.hits);
  };

  //for the seacch, after we type in something and submit search...
  //the search bar returns to it's normal state with no text in it 
  const updateSearch = e => {
    setSearch(e.target.value);
  };

  //the search only makes a request to the API when we finish typing and submit search
  //on submit search we call the query to request the API data
  const getSearch = e => {
    e.preventDefault();
    setQuery( );
    setSearch('');
  }


  //jsx content that displays the data in our application
  return(
    <div className="App">

      <form onSubmit={getSearch} className="search-form">
        <input 
        className="search-bar" 
        type="text"
        value={search}
        onChange={updateSearch} 
        placeholder="Search through millions of recipes"/>
        <button className="search-button" type="submit">Search</button>
      </form>
      <div className="recipes">
      {recipes.map( x => (
        <Recipe 
        title={x.recipe.label} 
        calories={x.recipe.calories} 
        image={x.recipe.image} 
        ingredients={x.recipe.ingredients}
        fats= {x.recipe.totalNutrients.FAT.quantity} 
        proteins= {x.recipe.totalNutrients.PROCNT.quantity}
        carbs= {x.recipe.totalNutrients.CHOCDF.quantity} />
      ))}
      </div>



    </div>
  )
}
 
export default App;
