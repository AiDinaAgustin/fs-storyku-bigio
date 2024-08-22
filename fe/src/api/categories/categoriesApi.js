import ConfigApi from "@/api/configApi.js";

export const fetchCategories = async () => {
  try {
    const response = await ConfigApi.get("/categories");
    return response.data;
  } catch (error) {
    console.error("Error fetching categories:", error);
    throw error;
  }
};
