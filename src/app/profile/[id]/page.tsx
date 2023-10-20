import React from 'react';


const UserProfile = ({params}:any) => {

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1>User profile page</h1>
      <p>My id is: {params.id}</p>
    </div>
  );
}

export default UserProfile;