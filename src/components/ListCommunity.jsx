import CardCommunity from "./CardCommunity";
import { useNavigate } from "react-router-dom";

function ListCommunity({community}) {

  const navigate = useNavigate();

  function onSeeDetailsClick(task) {
    const query = new URLSearchParams();
    query.set("title", task.title);
    query.set("description", task.description);
    navigate(`/task?${query.toString()}`);
  }

  return (
    <div className="flex flex-row flex-wrap gap-5">
      <CardCommunity
        community={community}
        onSeeDetailsClick={onSeeDetailsClick}
      />
    </div>
  );
}

export default ListCommunity;
