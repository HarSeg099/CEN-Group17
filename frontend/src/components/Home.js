import React,{Fragment, useState, useEffect} from 'react'
import Pagination from 'react-js-pagination'
//import Slider from 'rc-slider'
//import 'rc-slider/assets/index.css';

import MetaData from './layout/MetaData'
import Product from './product/Product'
import Loader from './layout/Loader'

import { useDispatch, useSelector } from 'react-redux'
import { getProducts } from '../actions/productActions'
import { useAlert } from 'react-alert'

const Home = ({match}) => {

    const [currentPage, setCurrentPage] = useState(1)    
    const [rating, setRating] = useState(0)

    const alert = useAlert();
    const dispatch = useDispatch();

    const { loading, products, error, productsCount,  resPerPage } = useSelector(state => state.products)

    const keyword = match.params.keyword

    useEffect(() => {

        if(error){
            return alert.error(error)
        }

        dispatch(getProducts(keyword, currentPage,rating));
        
    }, [dispatch,error, alert,currentPage,keyword,rating])

    function setCurrentPageNo(pageNumber) {
        setCurrentPage(pageNumber)
    }

    return (
        <Fragment>
            {loading? <Loader/>: (
             <Fragment> 
             <MetaData title={'Buy Best Books online'} />
            
            <h1 id="products_heading">Books</h1>

            <section id="products" className="container mt-5">
                <div className="row">
                {products && products.map(product => (
                    <Product key={product._id} product={product}/>
                 
                ))}
                    
                </div>
            </section>

         
            <div className="d-flex justify-content-center mt-5">
            <Pagination
               activePage={currentPage}
                itemsCountPerPage={resPerPage}
                totalItemsCount={productsCount}
                onChange={setCurrentPageNo}
                nextPageText={'Next'}
                prevPageText={'Prev'}
                firstPageText={'First'}
                lastPageText={'Last'}
                itemClass="page-item"
                linkClass="page-link"
            />
            </div>
        
             </Fragment>  
            )}
            
        </Fragment>
    )
}

export default Home