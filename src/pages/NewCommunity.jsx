import FormCommunity from "../components/FormCommunity";
import Title from "../components/Title";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../services/fireBase";
import { useAlert } from "../context/AlertContext";
import { useNavigate } from "react-router-dom";

function NewCommunity() {
  const navigate = useNavigate();

  const onAdd = async (name, description, image) => {
    try {
      const docRef = await addDoc(collection(db, "communities"), {
        name,
        description,
        image,
        member: [],
        createdAt: new Date(),
      });
      showAlert("success", "Tudo certo!", "Operação concluída");

      navigate("/");

      return docRef.id;
    } catch (error) {
      showAlert("error", "Erro", "Ocorreu um problema ao salvar");
      throw error;
    }
  };

  const { showAlert } = useAlert();

  return (
    <div className="flex flex-col gap-6">
      <Title>Nova Comunidade</Title>
      <FormCommunity onAddCommunitySubmit={onAdd} />
    </div>
  );
}

export default NewCommunity;
