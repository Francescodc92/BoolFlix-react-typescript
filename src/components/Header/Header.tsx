import logo from "../../assets/img/logo.png";
import { Categories } from "./Categories/Categories";
import "./Header.css";
import { SearchForm } from "./SearchForm/SearchForm";

export const Header = () => {
  return (
    <header className="header">
      <div className="left">
        <div className="logo-container">
          <a href="#">
            <img src={logo} alt="logo" />
          </a>
        </div>
        {/* logo container */}
        <Categories />
        {/* input categories */}
      </div>
      {/* header section left */}
      <div className="right">
        <SearchForm />
      </div>
    </header>
  );
};
