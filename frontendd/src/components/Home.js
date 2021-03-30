import React, {Fragment} from 'react'

import MetaData from './layout/MetaData'

const Home = () => {
    return (
        <Fragment>
            <MetaData title={'Buy the Best Books Online'}/>
            <h1 id="products_heading">Best Books</h1>

            <section id="products" className="container mt-5">
      <div className="row">
        <div className="col-sm-12 col-md-6 col-lg-3 my-3">
        </div>
      </div>
    </section>
        </Fragment>
    )
}

export default Home
