import { useState } from "react";
import Input from "./Input";
import { useAlert } from "../context/AlertContext";
import ImageUpload from "./ImageUpload";

function FormCommunity({ onAddCommunitySubmit }) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const { showAlert } = useAlert();

  function onImageUpload(image) {
    setImage(image);
  }

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col ">
        <label>Nome</label>
        <Input
          type="text"
          placeholder="Digite aqui..."
          value={name}
          onChange={(event) => setName(event.target.value)}
        />
      </div>
      <div className="flex flex-col ">
        <label>Descrição</label>
        <Input
          type="text"
          placeholder="Digite aqui..."
          value={description}
          onChange={(event) => setDescription(event.target.value)}
        />
      </div>

      <ImageUpload onImageUpload={onImageUpload}></ImageUpload>

      <button
        disabled={!name || !description || !image}
        className="rounded px-4 py-2 w-52 bg-green-800 hover:bg-green-900 text-white disabled:bg-gray-400"
        onClick={() => {
          if (!name.trim() || !description.trim()) {
            return showAlert("error", "Erro", "Preencha todos os campos.");
          }
          onAddCommunitySubmit(name, description, image);
          setName("");
          setDescription("");
        }}
      >
        Criar
      </button>
    </div>
  );
}

export default FormCommunity;
