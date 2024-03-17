
export default function CartItem({name,quantity,price ,onAdd,onRemove}){

    return <li className="cart-item">
        <p>
            {name}-{quantity}-{price}
        </p>
        <p className="cart-item-actions">
            <button onClick={onAdd}>+</button>
            <span>{quantity}</span>
            <button onClick={onRemove}>-</button>
        </p>
    </li>
}