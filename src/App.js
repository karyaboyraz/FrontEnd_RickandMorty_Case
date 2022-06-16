import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import React, { Component } from "react";

import Mainpage from "./Components/Mainpage";
import Episode from "./Components/EpisodeListing";
import Location from "./Components/LocationListing";
import Character from "./Components/CharacterListing";
import Header from "./Components/Header";
import DetailCard from "./Components/DetailCard";
import NotFoundPage from "./Components/NotFoundPage";

export default class App extends Component {
  render() {
    return (
      <div className="App">
        <Router>
          <div className="p-5">
            <Header />
          </div>

          <Routes>
            <Route path="/" element={<Mainpage />} />
            <Route path="/episode" element={<Episode />} />
            <Route path="/location" element={<Location />} />
            <Route path="/character" element={<Character />} />
            <Route path="/episode/:Id" element={<DetailCard />} />
            <Route path="/character/:Id" element={<DetailCard />} />
            <Route path="/location/:Id" element={<DetailCard />} />
            <Route path='*' exact={true} element={<NotFoundPage />} />
          </Routes>
        </Router>
      </div>
    );
  }
}

