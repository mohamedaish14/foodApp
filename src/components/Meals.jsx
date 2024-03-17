import { useState,useEffect, useContext } from "react";
import Button from './UI/Button.jsx'
import CartContext from "../store/CartContext.jsx";
export default function Meals(){
    const [loadedMeals,setLoadedMeals]=useState([])
   const cartContext= useContext(CartContext)
    function handleAdd(meal){
        cartContext.addItem(meal);
    }
    
   useEffect(()=>{
     async function fetchMeals(){
   const response=await fetch('http://localhost:3000/meals');
    if(!response.ok){
        throw new Error('Network response was not ok');
    }
    const meals=await response.json();
    setLoadedMeals(meals);
}
fetchMeals();
   },[]);

return <ul id="meals">{
    loadedMeals.map((meal)=>(
        <li
        className="meal-item"
        key={meal.id}>

            <article>
                <img src={`http://localhost:3000/${meal.image}`}/>
                <div>
                    <h3>{meal.name}</h3>
                    <p className="meal-item-price">
                        {meal.price} $
                    </p>
                    <p className="meal-item-description>">
                        {meal.description}
                    </p>
                </div>
                <p className="meal-item-actions">
                    <Button onClick={()=>handleAdd(meal)}>Add to cart</Button>
                </p>
            </article>
            </li>
    ))
}</ul>
}