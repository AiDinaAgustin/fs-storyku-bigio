const getCategories = async () => {
    try {
      const categories = ["FINANSIAL", "TEKNOLOGI", "KESEHATAN"]; 
      return categories;
    } catch (error) {
      throw new Error("Failed to get categories: " + error.message);
    }
  };
  
  const getStatuses = async () => {
    try {
      const statuses = ["TERBIT", "DRAF"]; 
      return statuses;
    } catch (error) {
      throw new Error("Failed to get statuses: " + error.message);
    }
  };
  
  module.exports = {
    getCategories,
    getStatuses,
  };