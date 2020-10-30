import React from 'react';
import PropTypes from 'prop-types';
import { Consumer } from "./FormContext";

Greeting.propTypes = {
    
};

function Greeting(props) {
    return (
        <Consumer>
            {username =><p>{`${username}님 안녕하세요`}</p>}
        </Consumer>
    );
}

export default Greeting;