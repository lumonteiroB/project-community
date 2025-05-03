import { useNavigate } from "react-router-dom";

function Header() {
  const navigate = useNavigate();

  function navHome() {
    navigate("/");
  }

  return (
    <div className="bg-white w-full flex flex-row content-center items-center p-3">
      <h2
        className="text-2xl font-bold text-gray-600 hover:cursor-pointer"
        onClick={() => navHome()}
      >
        Communities
      </h2>
    </div>
  );
}

export default Header;
