import React, { useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { observer } from "mobx-react-lite";
import { Context } from "../store/context";

import "./Header.css";
import logo from "./logo.png";
import SearchBar from "./SearchBar";

const Header = ({ onSearch }: { onSearch: (query: string) => void }) => {
    const { store } = useContext(Context);
    const navigate = useNavigate();
    const location = useLocation();

    const excludeSearchBarPaths = ["/project_x", "/project_x/about", "/project_x/favorites"];
    const shouldRenderSearchBar = !excludeSearchBarPaths.includes(location.pathname);

    const handleLogoClick = () => navigate("/project_x");

    const handleFavoritesClick = () => {
        navigate("/project_x/favorites");
    };

    return (
        <div className="wrapper">
            <header className="header">
                <div className="logo-container" onClick={handleLogoClick}>
                    <img src={logo} alt="Logo" className="logo" />
                    <h1>Kinopoisk Clone</h1>
                </div>

                <nav>
                    <div
                        className="favorites-container"
                        onClick={handleFavoritesClick}
                    >
                        <a
                            className={
                                location.pathname === "/project_x/favorites" ? "nav-link active" : "nav-link"
                            }
                        >
                            Избранное
                        </a>
                        {store.bookmarks.length > 0 && (
                            <span className="favorites-badge">
                                {store.bookmarks.length}
                            </span>
                        )}
                    </div>
                </nav>

                {shouldRenderSearchBar && <SearchBar onSearch={onSearch} />}
            </header>
        </div>
    );
};

export default observer(Header);
