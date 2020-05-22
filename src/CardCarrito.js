import React from 'react';

function CardCarrito(props){
    
    
        return(
            <div className="card text-white bg-success my-3">
                <div className="card-header">
                    `Tu producto es: {props.name}
                    El precio es: {props.regularPrice}`
                    <span>&times;</span>  
                </div>
    
                <div className="card-body">
                    <p className="card-text">Gracias por su cmompra</p>
                </div>
                <div className="card-footer text-center">
                    <button className="close" onClick={() => props.delete()}>Quitar Proucto</button>
                </div>
            </div>
        )
    }

    export default CardCarrito;