import React from 'react';
import { Link } from 'react-router-dom';

const LocationList = ({ locationList }) => {
    if (locationList === null || locationList === undefined || locationList.length === 0) {
        return (
            <Link to="/locationform">Add a location of interest</Link>
        )
    } else {
        return (
            locationList.map((location) => {
                return (
                    <div className="mt-3" key={location.name}>
                        {location.name}
                        <br />
                        {location.location}
                        <br />
                        {location.description}
                    </div>
                )
            })
        )
    }
}

export default LocationList;