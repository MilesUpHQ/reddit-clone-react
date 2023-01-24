import { useNavigate } from "react-router-dom";

function MyButton() {
  let navigate = useNavigate();

  const createcommunity = () => {
    navigate("/r/new");
  }

  return (
    <button className="post-create join-btn" onClick={createcommunity}>
      Create Community
    </button>
  );
}

export default MyButton