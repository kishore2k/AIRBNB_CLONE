import React from 'react';
import {Routes, Route, BrowserRouter} from "react-router-dom";
import LoginPage from "./pages/LoginPage.js";
import RegisterPage from "./pages/RegisterPage.js";
import HomePage from "./pages/HomePage.js";
import AccountPage from "./pages/AccountPage.js";
import PlacePage from "./pages/PlacePage.js";
import { UserContextProvider } from './UserContext.js';
import axios from 'axios';

axios.defaults.withCredentials = true;

export default function App(){
    return(
        <UserContextProvider>
            <BrowserRouter>
                <Routes>
                    <Route index element={<HomePage />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/register" element={<RegisterPage />} />
                    <Route path="/account/:subpage?" element={<AccountPage />} />
                    <Route path="/account/:subpage/:action" element={<AccountPage />} />
                    <Route path="/place/:id" element={<PlacePage />}/>
                </Routes>
            </BrowserRouter> 
        </UserContextProvider>
    );
}