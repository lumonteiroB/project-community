import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  doc,
  getDoc,
  updateDoc,
  arrayUnion,
  arrayRemove,
} from "firebase/firestore";
import { db } from "../services/fireBase";
import Title from "../components/Title";
import Button from "../components/Button";
import Loading from "../components/Loading";

function Details() {
  const { id } = useParams();
  const [community, setCommunity] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isMember, setIsMember] = useState(false);

  const fetchCommunityById = async (id) => {
    setLoading(true);
    setError(null);

    try {
      const docRef = doc(db, "communities", id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const communityData = { id: docSnap.id, ...docSnap.data() };
        setCommunity(communityData);

        const hasMember =
          communityData.member &&
          Array.isArray(communityData.member) &&
          communityData.member.includes("eFxUkTypt79P1g05BOOY");

        setIsMember(hasMember);
      } else {
        setError("Comunidade não encontrada");
      }
    } catch (err) {
      setError("Erro ao carregar comunidade");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const onMember = async () => {
    try {
      if (!id || !community) {
        console.warn("ID da comunidade ou dados não disponíveis");
        return;
      }

      const userId = "eFxUkTypt79P1g05BOOY";
      const currentMembers = community.member || [];
      const wasMember = currentMembers.includes(userId);

      await updateDoc(doc(db, "communities", id), {
        member: wasMember ? arrayRemove(userId) : arrayUnion(userId),
      });

      setCommunity((prev) => ({
        ...prev,
        member: wasMember
          ? prev.member.filter((m) => m !== userId)
          : [...prev.member, userId],
      }));

      setIsMember(!wasMember);

      await fetchCommunityById(id);
    } catch (error) {
      console.error("Erro ao atualizar participação:", error);
      setError("Ocorreu um erro ao atualizar sua participação");
    }
  };

  useEffect(() => {
    if (id) {
      fetchCommunityById(id);
    }
  }, [id]);
  if (loading) {
    return (
      <div className="p-4">
        <Title>Detalhes da comunidade</Title>
        <Loading/>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4">
        <Title>Erro</Title>
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div className="p-4 flex flex-col gap-5">
      <Title>Detalhes da comunidade</Title>

      <div className="mt-6 bg-white rounded-lg shadow-md p-6">
        {community.image && (
          <img
            src={community.image}
            alt={community.name}
            className="w-full max-w-md h-auto rounded-lg mb-4"
          />
        )}

        <h2 className="text-2xl font-bold mb-4">{community.name}</h2>

        <p className="text-gray-700 mb-4">{community.description}</p>

        <div className="p-3 rounded">
          <div className="font-semibold">
            Membros <span>{community.member?.length || 0}</span>
          </div>
        </div>
      </div>

      <Button onClick={onMember}>{isMember ? "Sair" : "Participar"}</Button>
    </div>
  );
}

export default Details;
