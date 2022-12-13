import React from 'react';
import { useQuery } from '@apollo/client';
import Auth from '../utils/auth';

// import ThoughtList from '../components/ThoughtList';
// import ThoughtForm from '../components/ThoughtForm';

import ChargerStatus from '../components/ChargerStatus';


import { QUERY_CHARGERS } from '../utils/queries';

const Home = () => {
  const { loading, data } = useQuery(QUERY_CHARGERS);
  const charger = data?.chargers[0] || []; //looping through later

  return (
    <main>
      <div className="flex-row justify-center">

        <div className="col-12 col-md-9 mb-3">
          {/* {loading ? (
            <div>Loading...</div>
          ) : (
             <ThoughtList
              thoughts={chargers}
               title="Some Feed for Thought(s)..."
             />
            <div>
              { FIX THE DATA QUERY } */}
          {
            Auth.loggedIn() ? (
            <div>
              <ChargerStatus />
            </div>
            ) : (
            <h4>Welcome to PortFi Charging Assist. <br></br>
              Please use the navigation links above to log in or sign up.</h4>
            )
          }
        </div>
      </div>
    </main>
  );
};

export default Home;
