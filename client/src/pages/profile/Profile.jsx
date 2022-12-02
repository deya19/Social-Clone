import "./profile.scss";
import FacebookTwoToneIcon from "@mui/icons-material/FacebookTwoTone";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import InstagramIcon from "@mui/icons-material/Instagram";
import PinterestIcon from "@mui/icons-material/Pinterest";
import TwitterIcon from "@mui/icons-material/Twitter";
import PlaceIcon from "@mui/icons-material/Place";
import LanguageIcon from "@mui/icons-material/Language";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Posts from "../../components/posts/Posts";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { makeRequest } from "../../axios";
import { useLocation, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/authContext";
import Update from "../../components/update/Update";
import { Helmet } from "react-helmet-async";

const Profile = () => {

  const [openUpdate,setOpenUpdate] = useState(false);
  const { currentUser, logout} = useContext(AuthContext);
  const userId = Number(useLocation().pathname.split("/")[2]);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const { isLoading, error, data } = useQuery({
    queryKey: ["user"],
    queryFn: () =>
      makeRequest.get("/users/find/" + userId).then((res) => {
        return res.data;
      }),
  });

  


  const { isLoading: rsLoading, data: relationshipData } = useQuery({
    queryKey: ["relationship"],
    queryFn: () =>
      makeRequest.get("/relationships?followedUserId=" + userId).then((res) => {
        return res.data;
      }),
  });


   
  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn:(following) => { 
      if(following) return makeRequest.delete("/relationships?userId=" + userId)
      return makeRequest.post("/relationships",{userId})
     },
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["relationship"] })
    },
  })



  const handleFollow =()=>{
   mutation.mutate(relationshipData.includes(currentUser.id))
  }

  const handleLogout = async (e) => {
    e.preventDefault();
   try {
   await logout();
   navigate("/login")
   } catch (error) {
     console.log(error)
   }
 };
  

  return (
    <>
      <Helmet>
        <title>{data?.name}</title>
        <meta name={data?.name} content={data?.name}/>
      </Helmet>
      <div className="profile">
        {isLoading ? (
          "loading"
        ) : (
          <>
            <div className="images">
              <img src={ data.coverPi ? "/upload/" + data.coverPi : "https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/HD_transparent_picture.png/640px-HD_transparent_picture.png"} alt="" className="cover" />
              <img src={data.profilePi? "/upload/" + data.profilePi:"https://crowd-literature.eu/wp-content/uploads/2015/01/no-avatar.gif"} alt="" className="profilePic" />
            </div>
            <div className="profileContainer">
              <div className="uInfo">
                <div className="left">
                  <a href="http://facebook.com">
                    <FacebookTwoToneIcon fontSize="large" />
                  </a>
                  <a href="http://facebook.com">
                    <InstagramIcon fontSize="large" />
                  </a>
                  <a href="http://facebook.com">
                    <TwitterIcon fontSize="large" />
                  </a>
                  <a href="http://facebook.com">
                    <LinkedInIcon fontSize="large" />
                  </a>
                  <a href="http://facebook.com">
                    <PinterestIcon fontSize="large" />
                  </a>
                </div>
                <div className="center">
                  <span>{data.name}</span>
                  <div className="info">
                    <div className="item">
                      <PlaceIcon />
                      <span>{data.city}</span>
                    </div>
                    <div className="item">
                      <LanguageIcon />
                      <span>{data.website}</span>
                    </div>
                  </div>
                  {rsLoading ? (
                    "loading"
                  ) : userId === currentUser.id ? (
                    <button onClick={()=>setOpenUpdate(true)}>update</button>
                  ) : (
                    <button onClick={handleFollow}>
                      {relationshipData.includes(currentUser.id)
                        ? "Following"
                        : "Follow"}
                    </button>
                  )}
                </div>
                <div className="right">
                  <EmailOutlinedIcon />
                  <MoreVertIcon onClick={() => setMenuOpen(!menuOpen)} style={{cursor:"pointer"}}/>
                  {(menuOpen && userId === currentUser.id) && (
                  <button onClick={handleLogout}>Logout</button>
                   )}
                </div>
              </div>
              <Posts userId = {userId}/>
            </div>
          </>
        )}
        {openUpdate && <Update setOpenUpdate = {setOpenUpdate} user={data}/>}
      </div>
    </>
  );
};

export default Profile;
