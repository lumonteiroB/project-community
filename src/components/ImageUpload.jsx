import { useState } from "react";

function ImageUpload({ onImageUpload }) {
  const [preview, setPreview] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);

  const changeImage = (e) => {    
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.match("image.*")) {
      alert("Por favor, selecione um arquivo de imagem válido!");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result);
      setUploadSuccess(false);
    };
    reader.readAsDataURL(file);
  };

  const sendImage = async () => {
    if (!preview) return;

    setIsUploading(true);
    setUploadSuccess(false);

    try {
      await onImageUpload(preview);
      setUploadSuccess(true);
    } catch (error) {
      console.error("Erro ao processar imagem:", error);
    } finally {
      setIsUploading(false);
    }
  };

  const removeImage = () => {
    setPreview("");
    setUploadSuccess(false);
  };

  return (
    <div className="p-4">
      <div className="mb-4">
        <label className="block mb-2">
          Selecione uma imagem:
          <input
            type="file"
            accept="image/*"
            onChange={changeImage}
            className="mt-1 block w-full text-sm text-gray-500
              file:mr-4 file:py-2 file:px-4
              file:rounded-md file:border-0
              file:text-sm file:font-semibold
              file:bg-blue-50 file:text-blue-700
              hover:file:bg-blue-100"
          />
        </label>
      </div>

      {preview && (
        <div className="mb-4">
          <h3 className="text-sm font-medium mb-2">Pré-visualização:</h3>
          <img
            src={preview}
            alt="Preview"
            className="max-w-xs max-h-48 border rounded"
          />
        </div>
      )}

      <div className="flex gap-4">
        <button
          onClick={sendImage}
          disabled={!preview || isUploading}
          className="px-4 py-2 bg-blue-200 text-blue-800 rounded hover:bg-blue-300 disabled:bg-gray-400"
        >
          {isUploading ? "Enviando..." : "Validar imagem"}
        </button>

        <button
          onClick={removeImage}
          disabled={!preview || isUploading}
          className="bg-red-200 text-red-800 hover:bg-red-300 rounded px-4 py-2 disabled:bg-transparent disabled:text-transparent"
        >
          Remover imagem
        </button>
      </div>

      {uploadSuccess && (
        <div className="mt-2 text-green-900 font-medium">
          ✓ Imagem enviada com sucesso!
        </div>
      )}
    </div>
  );
}

export default ImageUpload;
