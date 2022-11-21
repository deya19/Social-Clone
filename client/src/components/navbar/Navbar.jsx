import "./navbar.scss";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import WbSunnyOutlinedIcon from "@mui/icons-material/WbSunnyOutlined";
import GridViewOutlinedIcon from "@mui/icons-material/GridViewOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { DarkModeContext } from "../../context/darkModeContext";
import { AuthContext } from "../../context/authContext";

const Navbar = () => {
  const { toggle, darkMode } = useContext(DarkModeContext);
  const { currentUser } = useContext(AuthContext);

  return (
    <div className="navbar">
      <div className="left">
        <Link to="/" style={{ textDecoration: "none" }}>
          <span>SocialClone</span>
        </Link>
        <Link to="/" className="ico" style={{ textDecoration: "none",display:"flex",alignItems:"center"}}>
           <HomeOutlinedIcon />
        </Link>
        {darkMode ? (
          <WbSunnyOutlinedIcon onClick={toggle} style={{cursor:"pointer"}} />
        ) : (
          <DarkModeOutlinedIcon onClick={toggle} style={{cursor:"pointer"}}/>
        )}
        <GridViewOutlinedIcon/>
        <div className="search">
          <SearchOutlinedIcon />
          <input type="text" placeholder="Search..." />
        </div>
      </div>
      <div className="right">
        <PersonOutlinedIcon />
        <EmailOutlinedIcon />
        <NotificationsOutlinedIcon />
        <Link to={`/profile/${currentUser.id}`} style={{ textDecoration: "none" }}>
          <div className="user">
            <img
              src={currentUser.profilePi ? "/upload/" +currentUser.profilePi : "https://crowd-literature.eu/wp-content/uploads/2015/01/no-avatar.gif"}
              alt=""
            />
            <span>{currentUser.name}</span>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
