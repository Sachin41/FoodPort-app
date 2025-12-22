import React from 'react';
import { IMAGE_CDN_URL } from '../config/constant';
import { Link } from 'react-router-dom';

const Restaurantcard = (
    { cloudinaryImageId, id, name, avgRating, costForTwo,
        deliveryTime, cuisines, locality }
) => {
    return (
        <div className="restaurant-card" >
            <Link to={"/restaurant/" + id}>
                <img className="restaurant-logo" src={IMAGE_CDN_URL + cloudinaryImageId} alt={name} />
                <div className="restaurant-details">
                    <h3 className="restaurant-name">
                        {name?.length > 24 ? name?.slice(0, 21) + "...": name}
                        </h3>

                    <div className="esa-rating">
                        <h4 className="rating">
                            <span>{avgRating}</span>
                        </h4>
                        <h4>{costForTwo}</h4>
                        <h4>{deliveryTime} mins</h4>
                    </div>
                    <p className="cousine">
                        {cuisines.join(", ")?.length> 24 ? cuisines?.join(", ").slice(0, 24) +"...": cuisines?.join(", ")}
                    </p>

                    <p className="location">{locality}</p>
                </div>
            </Link>
        </div>
    );
}
export default Restaurantcard;
