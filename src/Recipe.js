import React from 'react';
import style from './recipe.module.css';
import Chart from "react-google-charts";

//{title, calories, image, ingredients} pass props from App.js to here
const Recipe = ({title, calories, image, ingredients, fats,carbs,proteins}) => {
    console.log("fats", fats)
    return(
        <div className={style.recipe}>
            <h1>{title}</h1>
            <p>Calories: {calories}</p>
            <ol>
                {ingredients.map((ingredient, i) =>(
                    <li key={i}>{ingredient.text}</li>
                ))}
            </ol>
            <img className={style.image}src={image} alt="  "/>

            <Chart
                    width={'300px'}
                    height={'300px'}
                    chartType="PieChart"
                    loader={<div>Loading Chart</div>}
            data={[
                    ['Macro', 'g'],
                    ['Protein', proteins],
                    ['Carb', carbs],
                    ['Fat', fats],
                 ]}
            options={{
                title: 'Macronutrients',
                    // Just add this option
                    pieHole: 0.8,
                }}
            rootProps={{ 'data-testid': '1' }}
            />
        </div>
    );
};

export default Recipe;
