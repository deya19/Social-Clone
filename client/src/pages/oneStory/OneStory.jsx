import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import React, { useContext, useEffect, useState } from 'react'
import "./oneStory.scss";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { makeRequest } from '../../axios';
import MoreVertIcon from "@mui/icons-material/MoreVert";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { AuthContext } from '../../context/authContext';
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';


const OneStory = () => {
   

  const storyId = Number(useLocation().pathname.split("/")[2]);
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const { currentUser } = useContext(AuthContext);

  const { isLoading, error, data } = useQuery({
    queryKey: ["story"],
    queryFn: () =>
      makeRequest.get("/stories/find/" + storyId).then((res) => {
        return res.data;
      }),
  });

  
    const queryClient = useQueryClient();

    //for delete post
    const deleteMutation = useMutation({
      mutationFn: (storyId) => {
        return makeRequest.delete("/stories/" + storyId);
      },
      onSuccess: () => {
        // Invalidate and refetch
        queryClient.invalidateQueries({ queryKey: ["stories"] });
      },
    });

    const [progress, setProgress] = React.useState(0);

    React.useEffect(() => {
    const timer = setInterval(() => {
      setProgress((oldProgress) => {
        if (oldProgress === 100) {
          return 0;
        }
        const diff = 5.5;
        return Math.min(oldProgress + diff);
      });
    }, 248);

    return () => {
      clearInterval(timer);
    };
  }, []);

  

    const handleDelete = () => {
      deleteMutation.mutate(storyId);
      navigate("/")
    };

  
  

    
  // To close the after 5 min
   const Load = useEffect(() => { 
     setTimeout(() => {
        navigate("/");
      },5000);
     },[navigate])

     
     

 
  return (
    <div className='watchStory'>
      {!Load &&  
       <Box sx={{ width: '100%' }}>
        <LinearProgress variant="determinate" value={progress} color="inherit" />
       </Box>}
      <div className="moreItem">
        <MoreVertIcon className='iconMore' onClick={() => setMenuOpen(!menuOpen)}/>
        </div>
        {(menuOpen && data.userId === currentUser.id) && (
            <button onClick={handleDelete}>delete</button>
        )}
        <img src={"/upload/" + data?.img} alt="" />
    </div>
  )
}

export default OneStory