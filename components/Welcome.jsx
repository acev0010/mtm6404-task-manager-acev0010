
import React from "react";

function Welcome (props) {
    const isLoggedIn = props.isLoggedIn
  
    if (isLoggedIn) {
      return <UserWelcome />
    }
  
    return <GuestWelcome />
  }
  
export default Welcome;