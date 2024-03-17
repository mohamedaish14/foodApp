import { useContext } from 'react';
import logo from '../assets/logo.jpg';
import Button from './UI/Button.jsx';
import CartContext from '../store/CartContext.jsx';
import UserProgressContext from '../store/UserProgressContext.jsx';

export default function Header(){
    const cartcontext=useContext(CartContext);
    const userProgressContext=useContext(UserProgressContext)
    const totlaItems=cartcontext.items.reduce((totalNum,item)=>{
        return totalNum+item.quantity;
    },0);
    function handleCart(){
        userProgressContext.showCart();
    }
    return(
        <header id="main-header">
            <div id="title">
                <img src={logo} />
                <h1>Food App</h1>
            </div>
            <nav>
                <Button onClick={handleCart}>Cart ({totlaItems})</Button>
            </nav>
        </header>
    );
}