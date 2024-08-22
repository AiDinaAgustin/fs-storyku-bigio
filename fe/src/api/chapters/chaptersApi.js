import ConfigApi from "../configApi";

export const createChapter = async (storyId, chapterData) => {
  try {
    const response = await ConfigApi.post(`/stories/${storyId}/chapters`, {
      title: chapterData.title,
      story: chapterData.story,
    });
    return response.data;
  } catch (error) {
    console.error("Error creating chapter:", error.response ? error.response.data : error.message);
    throw error;
  }
};

export const fetchChaptersByStoryId = async (storyId) => {
  try {
    const response = await ConfigApi.get(`/stories/${storyId}/chapters`);
    return response.data;
  } catch (error) {
    console.error("Error fetching chapters:", error.response ? error.response.data : error.message);
    throw error;
  }
};

export const deleteChapter = async (storyId, chapterId) => {
  try {
    const response = await ConfigApi.delete(`/stories/${storyId}/chapters/${chapterId}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting chapter:", error.response ? error.response.data : error.message);
    throw error;
  }
};

export const updateChapter = async (storyId, chapterId, chapterData) => {
  try {
    const response = await ConfigApi.put(`/stories/${storyId}/chapters/${chapterId}`, {
      title: chapterData.title,
      story: chapterData.story,
    });
    return response.data;
  } catch (error) {
    console.error("Error updating chapter:", error.response ? error.response.data : error.message);
    throw error;
  }
};
