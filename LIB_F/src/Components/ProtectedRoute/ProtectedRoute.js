import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import notAuthImage from '../../Images/notAuthorizaed.svg';
const ProtectedRoute = (props) => {
  const { children, isFullPageLoading, validateToken, isUserLoggedIn, componentPath } = props;
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
    {isUserLoggedIn ? shouldRender && children :
      !isFullPageLoading && <div className='notAuthorizedPage'>
        <img src={notAuthImage} alt="" />
        <div>
          You are not authorized to access this page!! <Link style={{ color: '#1976d2' }} to='/login'>Please Login</Link>
        </div>
      </div>}
  </>)
}

export default ProtectedRoute;