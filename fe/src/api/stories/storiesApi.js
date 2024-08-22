import ConfigApi from "../configApi";

export const fetchStories = async () => {
  try {
    const response = await ConfigApi.get("/stories");
    return response.data;
  } catch (error) {
    console.error("Error fetching stories:", error);
    throw error;
  }
};

export const fetchStoryById = async (id) => {
  try {
    const response = await ConfigApi.get(`/stories/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching story by id:", error);
    throw error;
  }
};

export const createStory = async (data) => {
  try {
    const formData = new FormData();
    formData.append("judul", data.judul);
    formData.append("penulis", data.penulis);
    formData.append("sinopsis", data.sinopsis);
    formData.append("kategori", data.kategori);
    formData.append("tags", data.tags);
    formData.append("status", data.status);
    formData.append("sampul", data.sampul);

    for (let [key, value] of formData.entries()) {
      console.log(key, value);
    }

    const response = await ConfigApi.post("/stories", formData);
    return response.data;
  } catch (error) {
    if (error.response) {
      console.error("Error response:", error.response.data);
    } else if (error.request) {
      console.error("Error request:", error.request);
    } else {
      console.error("Error message:", error.message);
    }
    throw error;
  }
};

export const updateStory = async (id, data) => {
  try {
    const formData = new FormData();
    formData.append("judul", data.judul);
    formData.append("penulis", data.penulis);
    formData.append("sinopsis", data.sinopsis);
    formData.append("kategori", data.kategori);
    formData.append("tags", data.tags);
    formData.append("status", data.status);
    if (data.sampul) {
      formData.append("sampul", data.sampul);
    }

    const response = await ConfigApi.put(`/stories/${id}`, formData);
    return response.data;
  } catch (error) {
    console.error("Error updating story:", error);
    throw error;
  }
};

export const deleteStory = async (id) => {
  try {
    const response = await ConfigApi.delete(`/stories/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting story:", error);
    throw error;
  }
};
