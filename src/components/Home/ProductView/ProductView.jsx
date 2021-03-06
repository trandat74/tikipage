import PropTypes from 'prop-types';
import React from 'react';
import { useHistory, useRouteMatch } from 'react-router';
import { STATIC_DOMAIN, THUMNAIL_DEFAULT } from '../../../constants';
import './productview.scss';

ProductView.propTypes = {
    data: PropTypes.array,
};
ProductView.defaultProps = {
    data: [],
}


// // {`${match.url}:productId`} 
// const search = useRouteMatch();


function ProductView(props) {
    const match = useRouteMatch();
    console.log(match.url)
    const history= useHistory();
    const { data } = props;
    const handleDetail=(item)=>{
    //    <Route path={`${search.url}product/:productId`} exact component={ProductDetail} />
        history.push(`${match.url}/product/${item.id}`)
    }
    return (
        <div  className="product__list">
            {data.map(function (item) {
                const thumbnailProduct = item.thumbnail
                    ? `${STATIC_DOMAIN}${item.thumbnail?.url}`
                    : THUMNAIL_DEFAULT;
                return (
                    <div onClick={()=>{handleDetail(item)}} key={item.id} className="product__item">
                        <img src={thumbnailProduct} alt="thum" className="product__img" />
                        <div className="product__content">
                            <p className="product__title">
                                {item.name}
                            </p>
                            <div className="product__price">
                                <span className="product__priceSale">
                                    {(new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(item.salePrice))}
                                    
                                </span>
                                <span className="product__percent">{!item.isPromotion ? '' : `-${item.promotionPercent}%`}</span>
                            </div>
                        </div>
                    </div>
                )
            })}
           
        </div>
    );
}

export default ProductView;