import React from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';

// import ThoughtForm from '../components/ThoughtForm';
// import ThoughtList from '../components/ThoughtList';

import ChargerInfo from '../components/ChargerInfo';
import AddCharger from '../components/AddCharger';
import DeleteCharger from '../components/DeleteCharger';


import { QUERY_USER, QUERY_ME } from '../utils/queries';

import Auth from '../utils/auth';

const Profile = () => {
  const { username: userParam } = useParams();
  const { loading, data } = useQuery(userParam ? QUERY_USER : QUERY_ME, {
    variables: { username: userParam },
  });


  const user = data?.me || data?.user || {};
  
  // navigate to personal profile page if username is yours
  if (Auth.loggedIn() && Auth.getProfile().data.username === userParam) {
    return <Navigate to="/me" />;
  }

  if (loading) {
    return <div>Loading user profile...</div>;
  }

  if (!user?.username) {
    return (
      <h4>
        Please use the navigation links above to log in or sign up.
      </h4>
    );
  }

  return (
    <div>
      <div className="flex-row justify-center mb-3">
        <h2 className="col-12 col-md-10 bg-dark text-light p-3 mb-5">
          Viewing {userParam ? `${user.username}'s` : 'your'} profile.
        </h2>
        <div className="col-12 col-md-10 mb-5">
          <ChargerInfo />
          <AddCharger />
          <DeleteCharger />
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
