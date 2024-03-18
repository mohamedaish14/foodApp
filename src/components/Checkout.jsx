import { useContext } from "react";
import Modal from "./UI/Modal";
import CartContext from "../store/CartContext.jsx";
import Input from "./Input.jsx";
import Button from "./UI/Button.jsx";
import UserProgressContext from "../store/UserProgressContext.jsx";


export default function Checkout(){
    const cartContext=useContext(CartContext);
    const userProgressContext=useContext(UserProgressContext);
    const CartTotal=cartContext.items.reduce((total,item)=>total+item.quantity*item.price,0);
    function handleclose(){
      userProgressContext.hideCheckout()
    }
    
    
    async function handleSubmit(event) {
        event.preventDefault();
       
        try {
          const formData = new FormData(event.target);
          const customerData = Object.fromEntries(formData.entries());
          
       
          const response = await fetch('http://localhost:3000/orders', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              order:{
              items: cartContext.items,
              customer: customerData}
            })
          });
       
          if (!response.ok) {
            throw new Error(`HTTP error ${response.status}`);
          }
       
          
          console.log('Order placed successfully!');
        } catch (error) {
          console.error('Error placing order:', error);
        }
      }
    
    return (
        <Modal open={userProgressContext.progress==='checkout'} onClose={handleclose} >
            <form onSubmit={handleSubmit}>
            <h2>Checkout</h2>
            <p>total amount: {CartTotal} $</p>
            <Input label='full name' type='text' id='name' />
            <Input label='e-mail address' type='email' id ='email' />
            <Input label='street' type='text' id='street'/>
            <div className="control-row">
                <Input label='postal code' type='text' id='postal-code'/>
                <Input label='city' type='text' id='city'/>
            </div>
            <p className="modal-actions">
                <Button onClick={handleclose} type='button' textOnly>close</Button>
                <Button type='submit' >submit</Button>
            </p>
            </form>
        </Modal>
    );
}