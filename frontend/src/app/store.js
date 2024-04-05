import { configureStore } from "@reduxjs/toolkit";
import Dashboard from "../pages/Dashboard";
import Login from "../pages/Login";
import Register from "../pages/Register";

export const store = configureStore({
    reducer: (
        <>
      <Dashboard />
      <Login />
      <Register/>
        </>
    ),
});
