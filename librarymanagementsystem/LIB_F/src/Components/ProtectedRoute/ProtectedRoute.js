import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const ProtectedRoute = (props) => {
  const { Component, validateToken, isUserLoggedIn, componentPath } = props;
  const [shouldRender, setShouldRender] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      try {
        await validateToken(componentPath, navigate);
      } catch (error) {
      }
    }
    fetchData();
  }, [])

  useEffect(() => {
    setShouldRender(isUserLoggedIn)
  }, [isUserLoggedIn])
  return (<>
    {shouldRender && <Component />}
  </>)
}

export default ProtectedRoute;