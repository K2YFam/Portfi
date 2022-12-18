import React, { useEffect, useState } from 'react';
import { useQuery } from '@apollo/client';
import { QUERY_ME } from '../utils/queries';
import Auth from '../utils/auth';

// import ThoughtList from '../components/ThoughtList';
// import ThoughtForm from '../components/ThoughtForm';

import ChargerStatus from '../components/ChargerStatus';

const styles = {
  welcome: {
    border: "2px solid #2d3e50",
    borderRadius: "4px",
    padding: "10px",
  },
  chargerStatus: {
    padding: "10px",
    textAlign: "center",
  }
}

const Home = () => {
  const { loading, data } = useQuery(QUERY_ME); //query me includes all user chargers
  const charger = data?.me.chargers[0] || null; //getting one charger for now

  if (loading) {
    return (
      <div>Loading user data...</div>
    )
  }

  return (
    <main>
      <div className="flex-row justify-center">
        <div className="col-12 col-md-10 mb-3">
          {
            Auth.loggedIn() ? (
              charger ?
                (
                  <div>
                    <div style={styles.chargerStatus} className="gradient-border">
                      <ChargerStatus chargerId={charger.chargerId} portId={charger.portId} />
                    </div>
                    <div className= "plugin"></div>
                  </div>)
                : (
                  window.location.replace('/me') //if not charger, redirect to profile to add charger
                )
            ) : (
              <h4 style={styles.welcome}>Welcome to PortFi Charging Assist. <br></br>
                Please use the navigation links above to log in or sign up.</h4>
            )
          }
        </div>
      </div>
    </main>
  );
};

export default Home;
