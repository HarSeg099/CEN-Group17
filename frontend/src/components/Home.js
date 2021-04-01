import React, {Fragment, useEffect} from 'react'

import MetaData from './layout/MetaData'
import Product from './product/Product'
import Loader from './layout/Loader'

import { useDispatch, useSelector } from 'react-redux'

import { getProducts } from "../actions/productActions"


const Home = () => {

   
    const dispatch = useDispatch();

    const { loading, products } = useSelector(state => state.products)

    useEffect(() => {

    
        dispatch(getProducts());
    }, [dispatch])

    return (
        <Fragment>
            {loading? <Loader/>: (
                <Fragment>
                    <MetaData title= {'Online Book Store'}/>
                    <div class="lato">
                    <h1 id="products_heading">Library</h1>
                    </div>
                    <section id="products" className="container mt-5">
                        <div className="row">
                            {products && products.map(product => (
                            <Product key = {product.id} product={product}/>
                            ))}
                            </div>
                            </section>
                </Fragment>
            )}
            
        </Fragment>
    )
}

export default Home
