/* eslint-disable no-unused-vars */
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router-dom"
import RootLayout from './RootLayout';
import Login from "./pages/authentication/Login";
import Registration from "./pages/authentication/Registration";
import LoggedOutPages from "./privateRoute/LoggedOutPages";
import PasswordReset from './pages/authentication/PasswordReset';
import LoggedInPages from "./privateRoute/LoggedInPages";
import Messages from "./pages/messages/Messages";
import Home from "./pages/home/Home";

function App() {
  const router = createBrowserRouter(createRoutesFromElements(
    <Route>

      <Route element={<RootLayout />}>

        <Route path="/" element={<Home />}></Route>

        <Route element={<LoggedInPages />}>

          <Route path="/messages" element={<Messages />}></Route>

        </Route>

      </Route>

      <Route element={<LoggedOutPages />} >

        <Route path="/login" element={<Login />}></Route>
        <Route path="/registration" element={<Registration />}></Route>
        <Route path="/passwordReset" element={<PasswordReset />}></Route>

      </Route>

    </Route>
  ))

  return (
    <RouterProvider router={router} />
  )
}

export default App
