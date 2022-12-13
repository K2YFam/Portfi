import React, { useEffect, useState } from 'react';
import { useQuery } from '@apollo/client';
import { QUERY_CHARGER_STATUS } from '../../utils/queries';


import StartCharger from '../StartCharger';
import StopCharger from '../StopCharger';
import MySurvey from '../surveyDisplay/surveyone';

const ChargerStatus = ({ chargerId, portId }) => {


    const { loading, data } = useQuery(QUERY_CHARGER_STATUS, {
        variables: { chargerId, portId },
    });
    const chargerStatus = data?.chargerStatus || {};

    if (loading) {
        return <div>Loading charger status...</div>;
    }

    return (

        <div>
            {chargerStatus.stationStatus ? "Charger Online" : "Charger Offline"} <br></br>
            {chargerStatus.activeSession ? "Charging..." : "Charging Not Started"} <br></br>
            {`Maximum Current is: ${chargerStatus.maxCurrent}A`} <br></br>
            <br></br>

            {/* {`${chargerId}, ${portId}`} */}
            <StartCharger />
            <StopCharger />
            <MySurvey />
        </div>
    )

    //   if (!comments.length) {
    //     return <h3>No Comments Yet</h3>;
    //   }

    //   return (
    //     <>
    //       <h3
    //         className="p-5 display-inline-block"
    //         style={{ borderBottom: '1px dotted #1a1a1a' }}
    //       >
    //         Comments
    //       </h3>
    //       <div className="flex-row my-4">
    //         {comments &&
    //           comments.map((comment) => (
    //             <div key={comment._id} className="col-12 mb-3 pb-3">
    //               <div className="p-3 bg-dark text-light">
    //                 <h5 className="card-header">
    //                   {comment.commentAuthor} commented{' '}
    //                   <span style={{ fontSize: '0.825rem' }}>
    //                     on {comment.createdAt}
    //                   </span>
    //                 </h5>
    //                 <p className="card-body">{comment.commentText}</p>
    //               </div>
    //             </div>
    //           ))}
    //       </div>
    //     </>
    //   );
};

export default ChargerStatus;
