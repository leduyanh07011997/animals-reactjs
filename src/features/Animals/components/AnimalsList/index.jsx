import React from 'react';
import PropTypes from 'prop-types';
import './styles.css'
import './responsive.css'
import { useSelector } from 'react-redux';

AnimalsList.propTypes = {
    
};

function AnimalsList(props) {
    const petsList = useSelector(state => state.user.petsList)
    console.log(petsList)
    return (
        <div className="grid wide container">
            <div className="row">
                {petsList.map(pet => (
                    <div className="col l-3 m-6 c-12">
                        <div className="animals__item">
                            <img src={pet.primary_photo_cropped.small} alt={pet.name} className="animals__img"/>
                            <h3 className="animals__pet-name">{pet.name}</h3>
                            <div className="animals__pet-description">{pet.description}</div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default AnimalsList;