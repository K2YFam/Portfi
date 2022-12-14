import React, {useState} from 'react';
import { useMutation } from '@apollo/client';
import { STOP_CHARGING } from '../../utils/mutations';

const StopCharger = ( {activeSessionId} ) => {
    const [activeSession, setActiveSession] = useState(true);
    const [stopCharger, { error }] = useMutation(STOP_CHARGING);
    // let mutationResponse;
    const handleStop = async (event) => {
        event.preventDefault();
        // console.log(activeSessionId)
        try {
          const mutationResponse = await stopCharger({
            variables: { 
                activeSessionId
            },
          });
          mutationResponse.data.stopCharging.response ? setActiveSession(false) : console.log('unable to stop charging')
        } catch (e) {
          console.log(e);
        }
      };


return (
    <div>
        <button onClick={handleStop}>StopCharger</button>
        {activeSession ? console.log('charging still active') : window.location.replace('/')}
        {/* BETTER WAY TO RETURN BACK TO CHARGING STATUS PAGE? */}
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

export default StopCharger;
