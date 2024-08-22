const prisma = require("../db");

const createChapter = async (data) => {
  try {
    const chapter = await prisma.chapter.create({
      data: {
        title: data.title,
        story: data.story,
        storyId: parseInt(data.storyId),
      },
    });
    return chapter;
  } catch (error) {
    throw new Error("Failed to create chapter: " + error.message);
  }
};

const getChapterById = async (id) => {
  const chapter = await prisma.chapter.findUnique({
    where: { id: parseInt(id) },
  });
  return chapter;
};

const getAllChapters = async (storyId) => {
  const chapters = await prisma.chapter.findMany({
    where: { storyId: parseInt(storyId) },
    orderBy: {
      createdAt: 'desc', 
    },
  });
  return chapters;
};

const updateChapter = async (id, data) => {
  try {
    const chapter = await prisma.chapter.update({
      where: { id: parseInt(id) },
      data: {
        title: data.title,
        story: data.story,
      },
    });
    return chapter;
  } catch (error) {
    throw new Error("Failed to update chapter: " + error.message);
  }
};

const deleteChapter = async (id) => {
  try {
    const chapter = await prisma.chapter.delete({
      where: { id: parseInt(id) },
    });
    return { message: "Chapter deleted successfully", chapter };
  } catch (error) {
    throw new Error("Failed to delete chapter: " + error.message);
  }
};

const getChaptersByStoryId = async (storyId) => {
    try {
      const chapters = await prisma.chapter.findMany({
        where: { storyId: parseInt(storyId) },
        orderBy: {
          createdAt: 'desc', 
        },
      });
      return chapters;
    } catch (error) {
      throw new Error("Failed to get chapters by storyId: " + error.message);
    }
  };

module.exports = {
  createChapter,
  getChapterById,
  getAllChapters,
  updateChapter,
  deleteChapter,
  getChaptersByStoryId
};