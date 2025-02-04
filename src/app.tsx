import React, { Suspense, lazy } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { Context, store } from "./store/context";
import { RatingsProvider } from "./components/RatingContext";
const FavoritesPage = lazy(() => import("./favorites/FavoritesPage"));
const MovieDetails = lazy(() => import("./details/MovieDetails"));
const HomePage = lazy(() => import("./home/HomePage"));

const App = () => (
    <Context.Provider value={{ store }}> 
        <RatingsProvider>
            <Router>
                <Header onSearch={(query) => console.log(query)} />
                <main className="centerContent">
                    <Suspense fallback={<div>Loading...</div>}>
                        <Routes>
                            <Route path="/project_x/" element={<HomePage />} /> {/* Главная страница */}
                            <Route path="/project_x/movies/:id" element={<MovieDetails />} /> {/* Детали фильма */}
                            <Route path="/project_x/favorites" element={<FavoritesPage />} /> {/* Избранное */}
                        </Routes>
                    </Suspense>
                </main>
                <Footer />
            </Router>
        </RatingsProvider>
    </Context.Provider>
);

export default App;
