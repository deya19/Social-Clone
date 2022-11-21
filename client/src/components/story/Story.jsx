import React from 'react';
import { Link } from 'react-router-dom';
import "./story.scss";

const Story = ({story}) => {
  return (
    <div className='storyContainer'>
      <Link to={`/story/${story.id}`} style={{ textDecoration: "none", color: "inherit" }}>
        <div className="story">
            <img src={"/upload/"+story.img} alt="" />
            <span>{story.name}</span>
        </div>
      </Link>
    </div>
  )
}

export default Story