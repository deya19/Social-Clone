import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useContext, useState } from "react";
import { makeRequest } from "../../axios";
import "./update.scss"
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { AuthContext } from "../../context/authContext";
import { useNavigate } from "react-router-dom";

const Update = ({setOpenUpdate,user}) => {

  const navigate = useNavigate();
  const { logout} = useContext(AuthContext);
  const [cover,setCover] = useState(null);
  const [profile,setProfile] = useState(null);
  const [texts, setTexts] = useState({
    email: user.email,
    name: user.name,
    city: user.city,
    website: user.website,
  });




  const upload = async(file) =>{
    console.log(file)
    try {
      const formData = new FormData();
      formData.append("file",file)
      const res = await makeRequest.post("/upload",formData)
      return res.data
    } catch (error) {
      console.log(error);
    }
  }

  const handleChange = (e) =>{
    setTexts((prev) => ({...prev , [e.target.name]: [e.target.value]}));
  }

  

  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn:(user) => { 
      return makeRequest.put("/users",user)
     },
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["user"] })
    },
  })

  



  const handleSubmit = async (e) => {
    e.preventDefault();

    
    mutation.mutate({...texts,
      coverPi:cover ? await upload(cover) :user.coverPi,
      profilePi:profile ? await upload(profile) : user.profilePi})
    setOpenUpdate(false)
    setCover(null);
    setProfile(null);
    logout();
    navigate("/login");
  };

  

  return (
    <div className="update">
    <div className="wrapper">
      <h1>Update Your Profile</h1>
      <form>
        <div className="files">
          <label htmlFor="cover">
            <span>Cover Picture</span>
            <div className="imgContainer">
              <img
                src={
                  cover
                    ? URL.createObjectURL(cover)
                    : "/upload/" + user.coverPi
                }
                alt=""
              />
              <CloudUploadIcon className="icon" />
            </div>
          </label>
          <input
            type="file"
            id="cover"
            style={{ display: "none" }}
            onChange={(e) => setCover(e.target.files[0])}
          />
          <label htmlFor="profile">
            <span>Profile Picture</span>
            <div className="imgContainer">
              <img
                src={
                  profile
                    ? URL.createObjectURL(profile)
                    : "/upload/" + user.profilePi
                }
                alt=""
              />
              <CloudUploadIcon className="icon" />
            </div>
          </label>
          <input
            type="file"
            id="profile"
            style={{ display: "none" }}
            onChange={(e) => setProfile(e.target.files[0])}
          />
        </div>
        <label>Email</label>
        <input
          type="text"
          value={texts.email}
          name="email"
          onChange={handleChange}
        />
        <label>Name</label>
        <input
          type="text"
          value={texts.name}
          name="name"
          onChange={handleChange}
        />
        <label>Country / City</label>
        <input
          type="text"
          name="city"
          value={texts.city ? texts.city : ""}
          onChange={handleChange}
        />
        <label>Website</label>
        <input
          type="text"
          name="website"
          value={texts.website ? texts.website : ""}
          onChange={handleChange}
        />
        <button onClick={handleSubmit}>Update</button>
      </form>
      <button className="close" onClick={() => setOpenUpdate(false)}>
        close
      </button>
    </div>
  </div>
)}

export default Update;