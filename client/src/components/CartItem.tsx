import React from 'react'

type CartProps = {
    prodName: string,
    prodSP: string,
    prodStock: number,
    prodId: number,
    prodsTP: number,
    prodQuantity: number,
    currencyCode: string,
    incrementClick: (id: number) => void,
    decrementClick: (id: number) => void,
    removeItem: (id: number) => void,
    
}
const CartItem: React.FC<CartProps> = ({currencyCode, incrementClick, decrementClick, removeItem,prodId, prodSP, prodName, prodStock, prodQuantity, prodsTP }) =>  {
    return (
        <div className="card d-flex allign-center border-primary w-20 text-center rounded">
                <div className="card-header bg-primary text-white">
                    <h4 className="text-uppercase">{prodName}</h4>
                </div>
                                
                <div className="card-body ">
                <p className="card-text mb-1">Price - {prodSP} { currencyCode}</p>
                    <p className="card-text"><small> {prodStock} available in stock</small></p>

                    <div>
                        <button
                            className="btn btn-sm border-primary mx-auto my-2"
                            onClick={() => incrementClick(prodId)}>+</button>
                        {prodQuantity}
                        <button
                            className="btn btn-sm mx-auto border-primary my-2"
                            onClick={() => decrementClick(prodId)}>-</button>
                    </div>
                    
                    <div>{prodsTP} { currencyCode} </div>
                        
                    <button
                        onClick={(e) => {
                            removeItem(prodId);
                        }}
                    className="btn btn-sm w-25 btn-danger mx-autotext-uppercase"
                    >
                    <i className="fa fa-trash"></i> Remove from Cart
                    </button>
                    
                    
                </div>
                            
                                
        </div>
    )
}

export default CartItem
