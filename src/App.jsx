// App.jsx
import MainPage from "./pages/MainPage";
import JobInfoPage from "./pages/JobInfoPage";
import { Route, Routes } from 'react-router-dom';
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const App = () => {
  const appRouter = createBrowserRouter([
    {
      path: "/",
      element: <MainPage />,
    },
    {
      path: "/job-info",
      element: <JobInfoPage />,
    },
  ]);
  return (
    <div>
      <RouterProvider router={appRouter} />
    </div>
  );
};

export default App;





