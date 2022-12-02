import Stories from "../../components/stories/Stories"
import Posts from "../../components/posts/Posts"
import Share from "../../components/share/Share"
import "./home.scss"
import { Helmet } from "react-helmet-async";

const Home = () => {
  return (
    <>
      <Helmet>
        <title>Home</title>
        <meta name="Social clone" content="connect everyone in the world to another"/>
      </Helmet>
      <div className="home">
        <Stories/>
        <Share/>
        <Posts/>
      </div>
    </>
  )
}

export default Home