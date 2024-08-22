import ConfigApi from "@/api/configApi.js";

export const fetchStatus = async () => {
  try {
    const response = await ConfigApi.get("/statuses");
    return response.data;
  } catch (error) {
    console.error("Error fetching status:", error);
    throw error;
  }
};
