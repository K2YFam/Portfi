import React from 'react';
import { useMutation } from '@apollo/client';
import { ADD_CHARGER } from '../../utils/mutations';

const AddCharger = ({ comments = [] }) => {
    const [addCharger, { error, data }] = useMutation(ADD_CHARGER);

    const handleClick = async () => {
        try {
            const { data } = await addCharger({
              variables: { 
                chargerId: 'placeholder',
                portId: 'placeholder', //attaching default simulator charger for now
               },
            });
            } catch (e) {
            console.error(e);
            }
        window.location.replace('/me');
    }

return (
    <div>
        <button className="btn btn-lg btn-addCharger m-2" onClick={handleClick}>Add Charger</button>
    </div>
)

};

export default AddCharger;
