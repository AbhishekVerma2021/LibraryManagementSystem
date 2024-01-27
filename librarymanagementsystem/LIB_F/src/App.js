import SignIn from "./Views/Authentication/SignIn";
import SignUp from "./Views/Authentication/SignUp";
import CreateBook from "./Views/CreateBook";
import HomePage from "./Views/HomePage";
import Profile from "./Views/Profile";
import Sidenav from "./Views/Sidenav";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route
            path='/' element={
              <Sidenav>
                <ProtectedRoute componentPath={'/'} Component={HomePage} />
              </Sidenav>
            }
          />
          <Route path='/profile' element={
            <Sidenav>
              <ProtectedRoute componentPath={'/profile'} Component={Profile} />
            </Sidenav>
          }
          />
          <Route path='/createPost' element={
            <Sidenav>
              <ProtectedRoute componentPath={'/createPost'} Component={CreateBook} />
            </Sidenav>
          }
          />
          {/* <Route path='/favorites' element={
            <Sidenav>
              <ProtectedRoute componentPath={'/favorites'} Component={Favourites} />
            </Sidenav>
          }
          />
          <Route path='/commanProfile' element={
            <Sidenav>
              <ProtectedRoute componentPath={'/commanProfile'} Component={CommanProfileView} />
            </Sidenav>
          }
          />
          <Route path='/messages' element={
            <Sidenav>
              <ProtectedRoute componentPath={'/messages'} Component={UserChatView} />
            </Sidenav>
          }
          /> */}
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
        </Routes>
      </Router>
      <ToastContainer />
    </div>
  );
}

export default App;
