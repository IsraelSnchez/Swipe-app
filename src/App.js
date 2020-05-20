import React, {useState,useEffect} from 'react';
import axios from 'axios'
import './App.css';

function App() {
  const array =["Television", "laptop", "xbox", "playstation", "tablet", "Music", "Videogame", "Book", "CD"]
  const randomElement = array[Math.floor(Math.random() * array.length)];
  
  const [search, setSearch] = useState(randomElement)
  const [products, setProducts] = useState([])


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
    }).catch((error) => {
      console.log(error)
    })
  }

  const URL = `https://api.bestbuy.com/v1/products(name=${search}*)?show=regularPrice,name,sku,image,description&format=json&apiKey=N5FNFnci6nGy7hie5JDVwISf&pageSize=5`

  return (


    <div className="App">
                {products.length > 0 ? products.map((product) => {
                  return( 
        <div className="card justify-content-center">
            <img src={product.image} alt="" className="card-img-top"/>
            <div className="card-body">
                  <p className="card-text">{product.regularPrice}</p>
            </div>
        </div>
        )  }) :
        <div className='col-12'>
          <h1>No hay Resultados en tu busqueda =::( </h1>
        </div>
        }
        <h2>Products</h2>
      <div className="conteiner my-5">
        <div className="row justify-content-center">
          <div className="col-12 col-sm-8 col-md-8 col-lg-8 col-xl-12">
            <form onSubmit={findProducts} className="form-inline justify-content-center">
              <input className="form-control" onChange={(event) => setSearch(event.target.value)} placeholder="Example. Television" name="product"/>
              <button type="submit" className="btn btn-success">Buscar</button>
            </form>
          </div>
        </div>
        </div>
    </div>

  );
}

export default App;
