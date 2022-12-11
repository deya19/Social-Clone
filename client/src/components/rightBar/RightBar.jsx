import "./rightBar.scss";

const RightBar = () => {
  return (
    <div className="rightBar">
      <div className="container">
        <div className="item">
          <span>Suggestions For You</span>
          <div className="user">
            <div className="userInfo">
              <img
                src="https://images.pexels.com/photos/4881619/pexels-photo-4881619.jpeg?auto=compress&cs=tinysrgb&w=1600"
                alt=""
              />
              <span>Ali Mahmoud</span>
            </div>
            <div className="buttons">
              <button>follow</button>
              <button>dismiss</button>
            </div>
          </div>
          <div className="user">
            <div className="userInfo">
              <img
                src="https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg?auto=compress&cs=tinysrgb&w=600"
                alt=""
              />
              <span>Mahmoud Ahmed</span>
            </div>
            <div className="buttons">
              <button>follow</button>
              <button>dismiss</button>
            </div>
          </div>
          <div className="user">
            <div className="userInfo">
              <img
                src="https://images.pexels.com/photos/3954401/pexels-photo-3954401.jpeg?auto=compress&cs=tinysrgb&w=600"
                alt=""
              />
              <span>Tesla</span>
            </div>
            <div className="buttons">
              <button>follow</button>
              <button>dismiss</button>
            </div>
          </div>
        </div>
        <div className="item">
            <span>What's happening</span>
         <div className="info">
            <img src="https://images.wsj.net/im-682409?width=367&height=245" alt="" />
            <h2>NASA’s Orion Spacecraft Set to Attempt Return</h2>
          <div className="trend">
              <span>Trending with</span>  
              <p>#Lorem ipsum dolor sit amet consectetur adipisicing.</p>
          </div>
         </div>
         <div className="info">
            <img src="https://images.wsj.net/im-682671?width=207&height=138" alt="" />
            <h2>NASA’s Orion Spacecraft Set to Attempt Return</h2>
          <div className="trend">
              <span>Trending with</span>  
              <p>#Lorem ipsum dolor sit amet.</p>
          </div>
         </div>
        </div>
      </div>
    </div>
  );
};

export default RightBar;
