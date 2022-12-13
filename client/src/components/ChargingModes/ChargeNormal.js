import React, {useState, useCallback} from "react";
import { useMutation } from '@apollo/client';
import { START_CHARGING, SET_POWER } from '../../utils/mutations';


export default async function ChargeNormal ({chargerId, portId, maxCurrent}) {
    const [startCharger, {  }] = await useMutation(START_CHARGING, {
        variables: {
            userId: 'placeholder',
            portId,
            chargingLimit: 80
        } 
    });
    const activeSessionId = await startCharger.data.startCharging.activeSessionId;
    console.log(startCharger.data, activeSessionId)

    const [setPower, {  }] = useMutation(SET_POWER, {
        variables: {
            limit: maxCurrent/2, //integer only
            activeSessionId,
            unit: 'current'
        } 
    });
    console.log(setPower.data)

    return (
        <div>

        </div>
    )
}


