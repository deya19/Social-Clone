import { useContext, useState } from "react";
import "./comments.scss";
import { AuthContext } from "../../context/authContext";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { makeRequest } from "../../axios";
import CommentCon from "../commentContainer/CommentCon";

const Comments = ({postId}) => {


  const [desc,setDesc] = useState("")
  const { currentUser } = useContext(AuthContext);
  

  const { isLoading, error, data } = useQuery({
    queryKey: ["comments"],
    queryFn: () =>
    makeRequest.get("/comments?postId=" + postId ).then((res)=>{
      return res.data;
    })
  })

      
  
 
  
  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn:(newComment) => { 
      return makeRequest.post("/comments",newComment)
     },
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["comments"] })
    },
  })

    

  const handleClick = async (e) => {
    e.preventDefault();
    mutation.mutate({desc , postId})
    setDesc("")
  };


  

  
  
  return (
    <div className="comments">
      <div className="write">
        <img src={currentUser.profilePi ? "/upload/" + currentUser.profilePi : "https://crowd-literature.eu/wp-content/uploads/2015/01/no-avatar.gif"} alt="" />
        <input type="text" placeholder="write a comment" onChange={e=>setDesc(e.target.value)} value={desc} />
        <button onClick={handleClick}>Send</button>
      </div>
      {isLoading
       ? "Loading" 
       : data.map((comment) => (
        <CommentCon comment={comment} key={comment.id}/>
      ))}
    </div>
  );
};

export default Comments;
