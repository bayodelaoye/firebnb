import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Outlet, createBrowserRouter, RouterProvider } from "react-router-dom";
// import LoginFormPage from './components/LoginFormPage';
// import SignupFormPage from './components/SignupFormPage';
import Navigation from "./components/Navigation/Navigation";
import * as sessionActions from "./store/session";
import { Modal } from "./context/Modal";
import SpotsIndex from "./components/Spots";
import SpotDetailsPage from "./components/Spots/SpotDetailsPage";
import CreateSpot from "./components/Spots/CreateSpot";
import ManageSpots from "./components/Spots/ManageSpots";
import UpdateSpot from "./components/Spots/UpdateSpot";
import Footer from "./components/Footer";

function Layout() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => {
      setIsLoaded(true);
    });
  }, [dispatch]);

  return (
    <>
      <Modal />
      <Navigation isLoaded={isLoaded} />
      {isLoaded && <Outlet />}
    </>
  );
}

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <SpotsIndex />,
      },
      {
        path: "/spots/:spotId",
        element: <SpotDetailsPage />,
      },
      {
        path: "/spots",
        element: <CreateSpot />,
      },
      {
        path: "/spots/current",
        element: <ManageSpots />,
      },
      {
        path: "/spots/:spotId/edit",
        element: <UpdateSpot />,
      },
      // {
      //   path: 'login',
      //   element: <LoginFormPage />
      // },
      // {
      //   path: 'signup',
      //   element: <SignupFormPage />
      // }
    ],
  },
]);

function App() {
  return (
    <>
      <RouterProvider router={router} />
      <Footer />
    </>
  );
}

export default App;
