import React,{Fragment, useState, useEffect} from 'react'
import Pagination from 'react-js-pagination'
import Slider from 'rc-slider'
import 'rc-slider/assets/index.css';

import MetaData from './layout/MetaData'
import Product from './product/Product'
import Loader from './layout/Loader'

import { useDispatch, useSelector } from 'react-redux'
import { getProducts } from '../actions/productActions'
import { useAlert } from 'react-alert'

const { createSliderWithTooltip } = Slider;
const Range = createSliderWithTooltip(Slider.Range)

const Home = ({match}) => {

    const [currentPage, setCurrentPage] = useState(1)  
    const [price, setPrice] = useState([1, 50])
    const [genre, setGenre] = useState('')  
    const [rating, setRating] = useState(0)
    const [topSeller, setTopSeller] = useState('')

    const genres = [
        'Romantic fiction',
        'Action fiction',
        'Dystopian fiction',
        'Fantasy fiction',
        'Horror fiction',
        'Historical fiction',
        'Children fiction',
        'Religious fiction',
        'Philosophical fiction',
        'Realistic fiction'
    ]

    const topSellers = [
        'true'
    ]

    const alert = useAlert();
    const dispatch = useDispatch();

    const { loading, products, error, productsCount,  resPerPage } = useSelector(state => state.products)

    const keyword = match.params.keyword

    useEffect(() => {

        if(error){
            return alert.error(error)
        }

        dispatch(getProducts(keyword, currentPage,price, genre, rating, topSeller));
        
    }, [dispatch,error, alert,currentPage,keyword,price, genre, rating, topSeller])

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
                <div className="col-6 col-md-3 mt-5 mb-5">
                        <div className="px-5">
                            <Range
                                marks={{
                                    1 : `$1`,
                                    50 : `$50`
                                }}
                                min={1}
                                max={50}
                                defaultValue={[1, 50]}
                                tipFormatter={value => `$${value}`}
                                tipProps={{
                                    placement: "top",
                                    visible: true
                                }}
                                value={price}
                                onChange={price => setPrice(price)}
                            />

                            <hr className="my-5" />

                            <div className="mt-5">
                                <h4 className="mb-3">
                                    Genres
                                </h4>

                                <ul className="pl-0">
                                    {genres.map(genre =>(
                                        <li
                                            style={{cursor: 'pointer',
                                                    listStyleType: 'none'
                                                }}
                                            key={genre}
                                            onClick={() => setGenre(genre)}
                                        >
                                            {genre}
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <hr className="my-3" />

                            <div className="mt-5">
                                <h4 className="mb-3">
                                    Ratings
                                </h4>

                                <ul className="pl-0">
                                    {[5, 4, 3, 2, 1, 0].map(star =>(
                                        <li
                                            style={{cursor: 'pointer',
                                                    listStyleType: 'none'
                                                }}
                                            key={star}
                                            onClick={() => setRating(star)}
                                        >
                                            <div className="rating-outer">
                                                <div className="rating-inner"
                                                    style={{
                                                        width: `${star * 20}%`
                                                    }}
                                                >

                                                </div>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <hr className="my-2" />

                            <div className="mt-5">
                                <h4 className="mb-3">
                                    Top Sellers
                                </h4>

                                <ul className="pl-0">
                                    {topSellers.map(topSeller =>(
                                        <li
                                            style={{cursor: 'pointer',
                                                    listStyleType: 'none'
                                                }}
                                            key={topSeller}
                                            onClick={() => setTopSeller(topSeller)}
                                        >
                                            {topSeller}
                                        </li>
                                    ))}
                                </ul>
                            </div>

                        </div>
                    </div>

                    <div className="col-6 col-md-9">
                        <div className="row">  



                {products && products.map(product => (
                    <Product key={product._id} product={product}/>
                 
                ))}
                    
                     </div>
                  </div>
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