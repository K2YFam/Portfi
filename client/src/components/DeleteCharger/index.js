import React from 'react';

const DeleteCharger = () => {
    function handleClick () {
        alert('Function coming soon')
    }

return (
    <div>
        <button className="btn btn-lg btn-disconnect m-2" onClick={handleClick}>Disconnect Charger</button>
    </div>
)

};

export default DeleteCharger;
