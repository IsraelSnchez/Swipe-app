import React, {useState,useEffect} from 'react';
import axios from 'axios'
import './App.css';
import CardCarrito from './CardCarrito.js'

function App() {
  
  const array =["Television", "laptop", "xbox", "playstation", "tablet", "Music", "Videogame", "Book", "CD"]
  const randomElement = array[Math.floor(Math.random() * array.length)];
  const [search, setSearch] = useState(randomElement)
  const [products, setProducts] = useState([])
  const [currentProduct, setCurrentProduct] = useState (0)
  const [carrito, setCarrito] = useState ([])
  const [cuenta, setCuenta] = useState (0)

  const agregarCarrito = () => { // detectar el currentProduct posicion actual y aumenta en 1 y agrega a carrito
    setCarrito(carrito => [...carrito, products[currentProduct]])
    console.log(carrito)
    setCuenta(cuenta + products[currentProduct].regularPrice)
    if(products.length > currentProduct + 1){
      setCurrentProduct(currentProduct + 1) 
    }
  }

  const next = () => { // cuando descartan aumenta el producto
    if (products.length > currentProduct+1) {
      setCurrentProduct( currentProduct+1)
    }
  }

  useEffect(() => {
    axios.get(URL).then((response) => {
      setProducts(response.data.products)
    }).catch((error) => {
      console.log(error)
    })
  },[])

  const findProducts = (event) =>{
    event.preventDefault()
    axios.get(URL).then((response) => {
      setProducts(response.data.products)
      setCurrentProduct(0)
    }).catch((error) => {
      console.log(error)
    })
  }
  const URL = `https://api.bestbuy.com/v1/products(name=${search}*)?show=regularPrice,name,sku,image,description&format=json&apiKey=N5FNFnci6nGy7hie5JDVwISf&pageSize=5`
  return (
    <div className="App">
      <small> {cuenta} </small>
{ products.length > 0 ? 
      (<div className="card justify-content-center">
            <img src={products[currentProduct].image} alt="" className="card-img-top"/>
            <div className="card-body">
<p className="card-text">{products[currentProduct].name}<br/>{products[currentProduct].regularPrice}</p>
                  <button onClick={next}>next</button>
                  <button onClick={agregarCarrito}>Agregar a Carrito</button>
            </div>
        </div>)
        :
        <h2>No hay resultados :(</h2>
}     
        <h2>Products</h2>
      <div className="container my-5">
        <div className="row justify-content-center">
          <div className="col-12 col-sm-8 col-md-8 col-lg-8 col-xl-12">
            <form onSubmit={findProducts} className="form-inline justify-content-center">
              <input className="form-control" onChange={(event) => setSearch(event.target.value)} placeholder="Example. Television" name="product"/>
              <button type="submit" className="btn btn-success">Buscar</button>
            </form>
          </div>
        </div>
        </div>
      <div className="row">
        <div className="col-12 d-flex flex-wrap">
          {
            carrito.length > 0 && carrito.map((producto) => (<CardCarrito name={producto.name} regularPrice={producto.regularPrice} delete={() => {
              const copiaCarrito = [...carrito]
              if (copiaCarrito.indexOf(producto) !== -1) {
                copiaCarrito.splice(copiaCarrito.indexOf(producto), 1)
                setCarrito([...copiaCarrito])
              }
            }}/>))
          }
        </div>
      </div>  
    </div>
  );
}
export default App;