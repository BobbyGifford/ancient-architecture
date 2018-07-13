import React from 'react';

const LocationList = ({ locationList }) => {
    if (locationList === null || locationList === undefined) {
        return (
            <div>Add location of interest</div>
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