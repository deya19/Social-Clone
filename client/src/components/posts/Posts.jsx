import Post from "../post/Post";
import "./posts.scss";
import { useQuery } from '@tanstack/react-query'
import { makeRequest } from "../../axios";
import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';

const Posts = ({userId}) => {
  

  const { isLoading, error, data } = useQuery({
    queryKey: ["posts"],
    queryFn: () =>
    makeRequest.get("/posts?userId=" + userId).then((res)=>{
      return res.data;
    })
  })

  




  return (
  <div className="posts">
    {error ? "Something was wrong!" : (isLoading 
    ? 
    <Box sx={{ width: 300 }}>
      <Skeleton />
      <Skeleton animation="wave" />
      <Skeleton animation={false} />
    </Box>
    : data.map(post=><Post post={post} key={post.id}/>))}
  </div>
  );
};

export default Posts;
