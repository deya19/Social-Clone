import React, { useContext, useState } from 'react'
import "./commentCon.scss"
import MoreVertIcon from "@mui/icons-material/MoreVert";
import moment from "moment";
import { AuthContext } from '../../context/authContext';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { makeRequest } from '../../axios';


const CommentCon = ({comment}) => {
  
  const { currentUser } = useContext(AuthContext);
  const [menuOpen, setMenuOpen] = useState(false);

  const queryClient = useQueryClient()

  const deleteMutation = useMutation({
    mutationFn: (commentId) => {
      return makeRequest.delete("/comments/" + commentId);
    },
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["comments"] });
    },
  });


  const handleDelete = () => {
    deleteMutation.mutate(comment.id);
  };

  return (
 <div className='comCon'>
     <div className="comment" key={comment.id}>
     <img src={comment.profilePi? "/upload/" + comment.profilePi:"https://crowd-literature.eu/wp-content/uploads/2015/01/no-avatar.gif"} alt="" />
     <div className="info">
       <span>{comment.name}</span>
       <p>{comment.desc}</p>
     </div>
     <span className="date">{moment(comment.createdAt).fromNow()}</span>
     <MoreVertIcon onClick={() => setMenuOpen(!menuOpen)} style={{cursor:"pointer"}}/>
     {(menuOpen && comment.userId === currentUser.id) && (
        <button onClick={handleDelete}>delete</button>
      )}
   </div>
 </div>
  )
}

export default CommentCon