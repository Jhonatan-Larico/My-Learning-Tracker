import {Fragment} from 'react'
// Inport compoenets
import HeaderCartButton from './HeaderCartButton';
import mealsImage from '../../assets/meals.jpg'
// Inport components styles 
import classes from './Header.module.css'


// Component 
const Header= (props)=>{
    return(
        <Fragment>
            <header className= {classes.header}>
                <h1>ReactMeals</h1>
                <HeaderCartButton onClick={props.onShowCart}/>
            </header>
            <div className= {classes["main-image"]}>
                <img src={mealsImage} alt= "A table full of delicious food!"/>
            </div>
        </Fragment>
    )
};


export default Header;