import React from 'react';
import { useQuery } from '@apollo/client';
import MySurvey from '../components/surveyDisplay/surveyone';

// import ThoughtList from '../components/ThoughtList';
// import ThoughtForm from '../components/ThoughtForm';

import ChargerStatus from '../components/ChargerStatus';
import StartCharger from '../components/StartCharger';
import StopCharger from '../components/StopCharger';

import { QUERY_CHARGERS } from '../utils/queries';

const Home = () => {
  const { loading, data } = useQuery(QUERY_CHARGERS);
  const charger = data?.chargers[0] || []; //looping through later

  return (
    <main>
      <div className="flex-row justify-center">
        <div
          className="col-12 col-md-10 mb-3 p-3"
          style={{ border: '1px dotted #1a1a1a' }}
        >
          {/* <ThoughtForm /> */}
        </div>
        <div className="col-12 col-md-8 mb-3">
          {loading ? (
            <div>Loading...</div>
          ) : (
            // <ThoughtList
            //   thoughts={chargers}
            //   title="Some Feed for Thought(s)..."
            // />
            <div>
              {/* FIX THE DATA QUERY */}
              <ChargerStatus />
              <StartCharger />
              <div>
                <MySurvey />
              </div>
              <StopCharger />
            </div>
          )}
        </div>
      </div>
    </main>
  );
};

export default Home;
