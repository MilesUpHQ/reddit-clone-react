import { useNavigate } from "react-router-dom";

function MyButton() {
  let navigate = useNavigate();

  const create_community = () => {
    navigate("/r/new");
  }

  return (
    <button className="post-create join-btn" onClick={create_community}>
      Create Community
    </button>
  );
}

export default MyButton