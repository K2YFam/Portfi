import React, { useState, useCallback } from "react";
import { useMutation } from '@apollo/client';
import { START_CHARGING, SET_POWER } from '../../utils/mutations';


export default function ChargeNormal({ chargerId, portId, maxCurrent }) {
    const [startCharger, { error1 }] = useMutation(START_CHARGING);
    // const activeSessionId = startCharger.data.startCharging.activeSessionId;
    let activeSessionId;
    // console.log(startCharger.data, activeSessionId)

    const [setPower, { error2 }] = useMutation(SET_POWER);
    // console.log(setPower.data)

    const handleCharge = async (event) => {
        event.preventDefault();
        // console.log(activeSessionId)
        try {
            const mutationResponse = await startCharger({
                variables: {
                    userId: 'placeholder',
                    portId,
                    chargingLimit: 80
                },
            });
            mutationResponse.data.startCharging.response ? console.log('charging started') : console.log('unable to stop charging');
            activeSessionId = mutationResponse.data.startCharging.activeSessionId
        } catch (e) {
            console.log(e);
        }

        try {
            const mutationResponse = await setPower({
                variables: {
                    limit: maxCurrent / 2, //integer only
                    activeSessionId,
                    unit: 'current'
                },
            });
            mutationResponse.data.setPower.response ? console.log('power set') : console.log('unable to stop charging')
        } catch (e) {
            console.log(e);
        }

    };


    return (
        <div>
            {handleCharge}
        </div>
    )
}


