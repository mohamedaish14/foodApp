import { useContext } from "react";
import Modal from "./UI/Modal.jsx";
import CartContext from "../store/CartContext.jsx";
import Button from './UI/Button.jsx'
import UserProgressContext from "../store/UserProgressContext.jsx";
import CartItem from "./CartItem.jsx";
export default function Cart(){
    const cartContext=useContext(CartContext)
    const userProgressContext=useContext(UserProgressContext);
    const CartTotal=cartContext.items.reduce((total,item)=>total+item.quantity*item.price,0);
    function handleCloseCart(){
      userProgressContext.hideCart()
    }
    function handleCheckout(){
      userProgressContext.showCheckout();
    }
    return( <Modal className="cart" open={userProgressContext.progress==='cart'} onClose={userProgressContext.progress==='cart'?handleCloseCart:null}>
          <h2> your cart</h2>
          <ul>
           {cartContext.items.map(item=>
           <CartItem key={item.id} name={item.name} quantity={item.quantity} price={item.price}
           onAdd={()=>cartContext.addItem(item)}
           onRemove={()=>cartContext.removeItem(item.id)} />
            )
           
           }

          </ul>
          <p className="cart-total">total:{CartTotal}$</p>
          <p className="modal-actions">
            <Button textOnly onClick={handleCloseCart}>close</Button>
             {
              cartContext.items.length>0&&<Button onClick={handleCheckout}>Go to checkout</Button>

             }          </p>
    </Modal>);
}