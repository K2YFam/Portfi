import React, {useState, useCallback} from "react";
import MySurvey from '../surveyTypes/surveytypeone';

const SurveyOne = () => {
    const [showPage, setShowPage] = useState(true);
    const onCompletePage = useCallback((data) => {
        console.log(data);
        setShowPage(!showPage)
    },[showPage])

    const setFinalPage = () => {
        return(
            <main>
                <h4>Charging Starting...</h4>
            </main>
        )      
    }
    return(
        <div>
            {
            showPage?
            <MySurvey showCompletedPage={data=>onCompletePage(data)} /> :
            setFinalPage()
            }
        </div>
    )
}
export default SurveyOne;