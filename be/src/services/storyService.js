const prisma = require("../db");
const cloudinary = require("../config/cloudinary");

const createStory = async (data, file) => {
  try {
    let imageUrl = "";

    if (file) {
      const response = await cloudinary.uploader.upload(file.path, {
        folder: "stories",
        allowed_formats: ["jpg", "jpeg", "png"],
      });
      imageUrl = response.secure_url;
    }

    let tagsArray = [];
    if (typeof data.tags === 'string') {
      tagsArray = data.tags.split(',').map(tag => tag.trim());
    } else if (Array.isArray(data.tags)) {
      tagsArray = data.tags;
    }

    const storyData = {
      judul: data.judul,
      penulis: data.penulis,
      sinopsis: data.sinopsis,
      sampul: imageUrl,
      kategori: data.kategori,
      status: data.status,
      tags: {
        create: tagsArray.map(tag => ({ name: tag }))
      }
    };

    const story = await prisma.story.create({
      data: storyData,
      include: {
        tags: true,
      },
    });

    return story;
  } catch (error) {
    throw new Error("Failed to create story: " + error.message);
  }
};

const getStoryById = async (id) => {
  const story = await prisma.story.findUnique({
    where: { id: parseInt(id) },
    include: { tags: true },
  });
  return story;
};

const getAllStories = async (filters) => {
  const { kategori, status } = filters;
  const stories = await prisma.story.findMany({
    where: {
      ...(kategori && { kategori }),
      ...(status && { status }),
    },
    include: { tags: true },
    orderBy: {
      createdAt: 'desc', 
    },
  });
  return stories;
};

const updateStory = async (id, data, file) => {
  try {
    const existingStory = await prisma.story.findUnique({
      where: { id: parseInt(id) },
      include: { tags: true },
    });

    if (!existingStory) {
      throw new Error("Story not found");
    }

    let imageUrl = existingStory.sampul;

    if (file) {
      const response = await cloudinary.uploader.upload(file.path, {
        folder: "stories",
        allowed_formats: ["jpg", "jpeg", "png"],
      });
      imageUrl = response.secure_url;
    }

    let tagsArray = existingStory.tags.map(tag => tag.name);
    if (typeof data.tags === 'string') {
      tagsArray = data.tags.split(',').map(tag => tag.trim());
    } else if (Array.isArray(data.tags)) {
      tagsArray = data.tags;
    }

    const updatedData = {
      judul: data.judul || existingStory.judul,
      penulis: data.penulis || existingStory.penulis,
      sinopsis: data.sinopsis || existingStory.sinopsis,
      sampul: imageUrl,
      kategori: data.kategori || existingStory.kategori,
      status: data.status || existingStory.status,
      tags: {
        deleteMany: {},
        create: tagsArray.map(tag => ({ name: tag }))
      }
    };

    const story = await prisma.story.update({
      where: { id: parseInt(id) },
      data: updatedData,
      include: { tags: true },
    });

    return story;
  } catch (error) {
    throw new Error("Failed to update story: " + error.message);
  }
};

const deleteStory = async (id) => {
  try {

    await prisma.chapter.deleteMany({
      where: { storyId: parseInt(id) },
    });
    
    await prisma.tag.deleteMany({
      where: { storyId: parseInt(id) },
    });

    const story = await prisma.story.delete({
      where: { id: parseInt(id) },
    });

    return { message: "Story deleted successfully", story };
  } catch (error) {
    throw new Error("Failed to delete story: " + error.message);
  }
};



module.exports = {
  createStory,
  getStoryById,
  getAllStories,
  updateStory,
  deleteStory,
};