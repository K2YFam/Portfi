import React from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';

// import ThoughtForm from '../components/ThoughtForm';
// import ThoughtList from '../components/ThoughtList';

import ChargerInfo from '../components/ChargerInfo';
import AddCharger from '../components/AddCharger';
import DeleteCharger from '../components/DeleteCharger';


import { QUERY_ME } from '../utils/queries';

import Auth from '../utils/auth';

const Profile = () => {
  const { username: userParam } = useParams();
  const { loading, data } = useQuery(QUERY_ME, {
    variables: { username: userParam },
  });


  const user = data?.me || {};
  const charger = data?.me.chargers[0] || null; //getting one charger for now
  const chargerQuantity = charger ? 1 : 0;

  const styles = {
    viewProfile: {
      textAlign: "center",
    },
    ternaryOne: {
      padding: "10px",
    }
  }
  // navigate to personal profile page if username is yours
  if (Auth.loggedIn() && Auth.getProfile().data.username === userParam) {
    return <Navigate to="/me" />;
  }

  if (loading) {
    return <div>Loading user profile...</div>;
  }

  if (!user?.username) {
    return (
      <h4 style={styles.viewProfile}>
        Please use the navigation links above to log in or sign up.
      </h4>
    );
  }

  const handleControlCharger = () => {
    window.location.replace('/');
  }

  return (
    <div style={styles.viewProfile} className= "gradient-border">
      <div className="flex-row justify-center mb-3">
        <h2 className="col-12 col-md-12 bg-dark text-light p-3 mb-5">
          Viewing {userParam ? `${user.username}'s` : 'your'} profile.
        </h2>
        <div className="col-12 col-md-10 mb-5">
          {charger ?
            (
              <div>
              <ChargerInfo chargerQuantity={chargerQuantity}/>
              <button className="btn btn-lg btn-control m-2" onClick={handleControlCharger}>Control Charging</button>
              <DeleteCharger />
            </div>
            )
            : (
              <div>
              <h4>Please click "Add Charger" button to attach a charger simulator for function testing.</h4>
              <AddCharger />
            </div>
            )
          }

          {/* 
          <ThoughtList
            thoughts={user.chargers}
            title={`${user.username}'s thoughts...`}
            showTitle={false}
            showUsername={false}
          /> */}
        </div>
        {/* {!userParam && (
          <div
            className="col-12 col-md-10 mb-3 p-3"
            style={{ border: '1px dotted #1a1a1a' }}
          >
            <ThoughtForm />
          </div>
        )} */}
      </div>
    </div>
  );
};

export default Profile;
