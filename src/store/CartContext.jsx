import { createContext,useReducer } from "react";


const CartContext=createContext({
    items:[],
    addItem:(item)=>{},
    removeItem:(id)=>{}
});
function cartReducer(state,action){
    if(action.type==='addItem'){
       const existingCartItemIndex=state.items.findIndex(
        (item)=>item.id===action.item.id
        );
        const updateditems=[...state.items];
        if(existingCartItemIndex>-1){
            const existingitem=state.items[existingCartItemIndex];
            const updateditem={
                ...existingitem,
                quantity:existingitem.quantity+1
            };
            updateditems[existingCartItemIndex]=updateditem
        }else{
            updateditems.push({...action.item,quantity:1})
        }
        return {...state,items:updateditems};
    }
    if(action.type==='removeItem'){
        const existingCartItemIndex=state.items.findIndex(
            (item)=>item.id===action.id
        );
       
        const existingitem=state.items[existingCartItemIndex];
        const updateditems=[...state.items]
        if(existingitem.quantity===1){
            updateditems.splice(existingCartItemIndex,1);
        }else{
            const updateditem={
                ...existingitem,
                quantity:existingitem.quantity-1
            };
            updateditems[existingCartItemIndex]=updateditem;
        }
        return {...state,items:updateditems};


    }
    return state;
}
 export function CartContextProvider({children}){
const [cart,dispatchCartAction]=useReducer(cartReducer,{items:[]});

function addItem(item){dispatchCartAction({type:"addItem",item})};
function removeItem(id){dispatchCartAction({type:"removeItem",id})};
const cartContext={
    items:cart.items,
    addItem,
    removeItem
}
console.log(cartContext);
    return <CartContext.Provider value={cartContext}>
{children}
    </CartContext.Provider>
 }

export default CartContext;