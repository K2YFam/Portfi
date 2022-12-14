import React, { useState, useEffect, useCallback } from "react";
import { useMutation } from '@apollo/client';
import { START_CHARGING, SET_POWER } from '../../utils/mutations';


export default function ChargeTurbo({ chargerId, portId, maxCurrent }) {
    const [startCharger, { error1 }] = useMutation(START_CHARGING);
    useEffect(() => {
        handleCharge();
      }, []);
    let activeSessionId;
    const [setPower, { error2 }] = useMutation(SET_POWER);

    const handleCharge = async (event) => {
        try {
            const mutationResponse = await startCharger({
                variables: {
                    userId: 'placeholder',
                    portId: 'placeholder',
                    chargingLimit: 100 //UPDATE FOR EACH MODE
                },
            });
            console.log(mutationResponse.data.startCharging.response)
            mutationResponse.data.startCharging.response ? console.log('charging started') : console.log('unable to stop charging');
            activeSessionId = mutationResponse.data.startCharging.activeSessionId
        } catch (e) {
            console.log(e);
        }

        try {
            const mutationResponse = await setPower({
                variables: {
                    limit: maxCurrent, //integer only //UPDATE FOR EACH MODE
                    activeSessionId,
                    unit: 'current'
                },
            });
            mutationResponse.data.setPower.response ? console.log('power set') : console.log('unable to stop charging')
            alert(`Started charging at 100% power to 100% battery`); //UPDATE FOR EACH MODE
        } catch (e) {
            console.log(e);
        }
        window.location.replace('/');
        //BETTER WAY?
    };

    return (<div></div>)
}


