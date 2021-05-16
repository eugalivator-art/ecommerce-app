import React from 'react'

type Props = {
    prodName: string,
    
}
function CartItem() {
    return (
        <div></div>
        // <div className="card d-flex allign-center border-primary w-20 text-center rounded">
        //         <div className="card-header bg-primary text-white">
        //             <h4 className="text-uppercase">{val.productName}</h4>
        //         </div>
                                
        //         <div className="card-body ">
        //             <h5 className="card-title">Description- The details of the product</h5>
        //             <p className="card-text">Price - { val.productSalePrice}</p>
        //             <p className="card-text"><small> {val.productStock} available in stock</small></p>

        //             <div>
        //                 <button
        //                     className="btn btn-sm border-primary mx-auto my-2"
        //                     onClick={() => this.props.increament(val.productId)}>+</button>
        //                 {val.productQty}
        //                 <button
        //                     className="btn btn-sm mx-auto border-primary my-2"
        //                     onClick={() => this.props.decreament(val.productId)}>-</button>
        //             </div>
                        
        //             <button
        //                 onClick={(e) => {
        //                     this.props.removeCartItem(val.productId);
        //                     this.deduceTotal(val.productSalePrice)
        //                 }}
        //             className="btn btn-sm w-25 btn-danger mx-autotext-uppercase"
        //             >
        //             <i className="fa fa-trash"></i> Remove from Cart
        //             </button>
                    
                    
        //         </div>
                            
                                
        // </div>
    )
}

export default CartItem
