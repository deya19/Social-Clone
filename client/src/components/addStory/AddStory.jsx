import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useContext, useState } from "react";
import { makeRequest } from "../../axios";
import "./addstory.scss"
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { AuthContext } from "../../context/authContext";


const AddStory = ({setOpenAddStory}) => {

  const { currentUser} = useContext(AuthContext);
  const [story,setStory] = useState(null);
  




    //to upload picture
  const upload = async() =>{
    try {
      const formData = new FormData();
      formData.append("file",story)
      const res = await makeRequest.post("/upload",formData)
      return res.data
    } catch (error) {
      console.log(error);
    }
  }



// to add story
  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn:(newPost) => { 
      return makeRequest.post("/stories",newPost)
     },
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["stories"] })
    },
  })


  const handleSubmit = async (e) => {
    e.preventDefault();
    let imgUrl = "";
    if(story) imgUrl = await upload()
    mutation.mutate({img:imgUrl})
    setStory(null)
    setOpenAddStory(false)
  };

  

  return (
    <div className="AddStory">
    <div className="wrapper">
      <h1>Add Story</h1>
      <form>
        <div className="files">
          <label htmlFor="story">
            <span>Story Picture</span>
            <div className="imgContainer">
              <img
                src={ story ?  URL.createObjectURL(story): (currentUser.profilePi ? "/upload/" +currentUser.profilePi : "https://crowd-literature.eu/wp-content/uploads/2015/01/no-avatar.gif")}
                alt=""
              />
              <CloudUploadIcon className="icon" />
            </div>
          </label>
          <input
            type="file"
            id="story"
            style={{ display: "none" }}
            onChange={(e) => setStory(e.target.files[0])}
          />
        </div>
        <button onClick={handleSubmit}>Add</button>
      </form>
      <button className="close" onClick={() => setOpenAddStory(false)}>
        close
      </button>
    </div>
  </div>
)}

export default AddStory;