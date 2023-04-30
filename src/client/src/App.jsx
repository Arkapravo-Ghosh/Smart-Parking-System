import React from 'react'
import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";
import './styles/App.css'
import NavBar from './components/NavBar/NavBar'
import DataTableContainer from './components/DataTableContainer/DataTableContainer'
import About from './pages/About/About';
import Loading from './components/Loading/Loading.jsx'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<NavBar />}>
      <Route index element={<DataTableContainer />} />
      <Route path="/about" element={<About />} />
    </Route>
  )
);

export default function App({ routes }) {
  return (
    <div className="App">
      <React.Fragment>
        <RouterProvider router={router} />
      </React.Fragment>
    </div>
  );
}
