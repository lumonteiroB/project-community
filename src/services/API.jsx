import axios from "axios";

export const getCommunities = async () => {
  try {
    const projectId = import.meta.env.VITE_FIREBASE_PROJECT_ID;

    const response = await axios.get(
      `https://${projectId}.firebaseio.com/communities.json`
    );

    if (!response.data) return [];

    return Object.entries(response.data).map(([key, value]) => ({
      id: key,
      ...value,
    }));
  } catch (error) {
    console.error("Erro ao buscar comunidades:", error);
    throw error;
  }
};

export const getCommunityById = async (id) => {
  try {
    const projectId = import.meta.env.VITE_FIREBASE_PROJECT_ID;

    const response = await axios.get(
      `https://${projectId}.firebaseio.com/communities/${id}.json`
    );

    if (!response.data) return null;

    return { id, ...response.data };
  } catch (error) {
    console.error(`Erro ao buscar comunidade com ID ${id}:`, error);
    throw error;
  }
};

export const editCommunity = async (communityId, updatedData) => {
  try {
    const projectId = import.meta.env.VITE_FIREBASE_PROJECT_ID;
    if (!projectId)
      throw new Error("VITE_FIREBASE_PROJECT_ID não está definida");

    const url = `https://${projectId}.firebaseio.com/communities/${communityId}.json`;

    const response = await axios.patch(url, updatedData);
    return {
      success: true,
      id: communityId,
      data: response.data,
    };
  } catch (error) {
    console.error("Erro ao atualizar comunidade:", error);
    throw new Error("Erro ao atualizar comunidade: " + error.message);
  }
};

export const createCommunity = async (communityData) => {
  try {
    const projectId =
      import.meta.env.VITE_FIREBASE_PROJECT_ID || "communities-ec57c";

    const url = `https://${projectId}.firebaseio.com/communities.json`;

    const dataWithMetadata = {
      ...communityData,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };

    const response = await axios.post(url, dataWithMetadata);

    return {
      success: true,
      id: response.data.name,
      data: dataWithMetadata,
    };
  } catch (error) {
    console.error("Erro ao criar comunidade:", error);
    throw {
      success: false,
      error: error.message,
    };
  }
};
