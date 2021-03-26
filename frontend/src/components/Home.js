import React from 'react'
import { Fragment,useState, useEffect } from 'react'
import MetaData from './layout/MetaData'
import Product from './product/Product'
import Loader from './layout/Loader'

import { useDispatch, useSelector } from 'react-redux'
import { getProducts } from '../actions/productActions'
import { useAlert } from 'react-alert'

const Home = () => {

    const [rating, setRating] = useState(0)

    const alert = useAlert();
    const dispatch = useDispatch();

    const { loading, products, error, productsCount } = useSelector(state => state.products)

    useEffect(() => {

        if(error){
            return alert.error(error)
        }

        dispatch(getProducts(rating));
        
    }, [dispatch,error, alert,rating])

    return (
        <Fragment>
            {loading? <Loader/>: (
             <Fragment> 
             <MetaData title={'Buy Best Books online'} />
            
            <h1 id="products-heading">Books</h1>

            <section id="products" className="container mt-5">
                <div className="row">
                {products && products.map(product => (
                    <Product key={product._id} product={product}/>
                 
                ))}
                    
                </div>
            </section>
             </Fragment>  
            )}
            
        </Fragment>
    )
}

export default Home