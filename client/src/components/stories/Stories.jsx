import { useContext, useState } from "react";
import "./stories.scss"
import { AuthContext } from "../../context/authContext"
import { makeRequest } from "../../axios";
import { useQuery } from "@tanstack/react-query";
import AddStory from "../addStory/AddStory";
import Story from "../story/Story";


const Stories = () => {

  const {currentUser} = useContext(AuthContext)
  const [openAddStory,setOpenAddStory] = useState(false);

  const { isLoading, error, data } = useQuery({
    queryKey: ["stories"],
    queryFn: () =>
    makeRequest.get("/stories").then((res)=>{
      return res.data;
    })
  })







  return (
    <div className="stories">
      <div className="profileStory">
          <img src={currentUser.profilePi?"/upload/" +currentUser.profilePi:"https://crowd-literature.eu/wp-content/uploads/2015/01/no-avatar.gif"} alt="" />
          <span className="profileName">{currentUser.name}</span>
          <button onClick={()=>setOpenAddStory(true)}>+</button>
        </div>
      {error ? "Something was wrong!" : (isLoading 
       ? "Loading" 
       :data.map(story=>(
        <Story story={story} key={story.id}/>
      )))}
      {openAddStory && <AddStory setOpenAddStory = {setOpenAddStory}/>}
    </div>
  )
}

export default Stories