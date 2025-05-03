import { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import ListCommunity from "../components/ListCommunity";
import { db } from "../services/fireBase";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";
import Title from "../components/Title";
import Loading from "../components/Loading";


function Home() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const [community, setCommunity] = useState([]);

  const fetchCommunities = async () => {
    setLoading(true);
    setError(null);

    try {
      const snapshot = await getDocs(collection(db, "communities"));
      setCommunity(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    } catch (err) {
      setError("Falha ao carregar comunidades");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  function onAdd() {
    navigate("/nova-comunidade");
  }

  useEffect(() => {
    fetchCommunities();
  }, []);

  return (
    <div className="flex flex-col gap-4">
      <Button onClick={() => onAdd()}>Nova comunidade</Button>
      <Title>Comunidades</Title>
      {loading ? (
        <Loading />
      ) : error ? (
        <div className="p-3 bg-red-100 text-red-700 rounded">
          {error}{" "}
          <button onClick={fetchCommunities} className="text-blue-600 ml-2">
            Tentar novamente
          </button>
        </div>
      ) : (
        <ListCommunity community={community} />
      )}
    </div>
  );
}

export default Home;
