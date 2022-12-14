import React, {useState, useCallback} from "react";
import { useMutation } from '@apollo/client';
import ChargeNormal from '../ChargingModes/ChargeNormal';


import MySurvey from '../surveyTypes/surveytypeone';

const SurveyOne = ({chargerId, portId, maxCurrent}) => {
    const [showPage, setShowPage] = useState(true);
    

    const onCompletePage = useCallback((data) => {
        console.log(data);
        setShowPage(!showPage)
    },[showPage])

    const setFinalPage = () => {
        return(
            <main>
                <h4>Charging Starting...

                    
                </h4>
            </main>
        )      
    }


    return(
        <div>
            {
            showPage?
            <MySurvey showCompletedPage={data=>onCompletePage(data)} /> :
            // setFinalPage()
            <ChargeNormal chargerId={chargerId} portId={portId} maxCurrent={maxCurrent}/>
            }
        </div>
    )
}
export default SurveyOne;