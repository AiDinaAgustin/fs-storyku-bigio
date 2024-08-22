import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PagesLayout from "@/components/templates/PagesLayout.jsx";
import FormLayout from "@/components/templates/FormLayout.jsx";
import { fetchCategories } from "@/api/categories/categoriesApi.js";
import { fetchStatus } from "@/api/status/statusApi.js";
import { createStory } from "@/api/stories/storiesApi.js";

export default function CreateStoryPages() {
  const [categories, setCategories] = useState([]);
  const [status, setStatus] = useState([]);
  const [formData, setFormData] = useState({
    judul: "",
    penulis: "",
    sinopsis: "",
    kategori: "",
    tags: "",
    status: "",
    sampul: null,
  });
  const navigate = useNavigate();

  useEffect(() => {
    const getCategories = async () => {
      try {
        const fetchedCategories = await fetchCategories();
        setCategories(fetchedCategories);
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      }
    };

    const getStatus = async () => {
      try {
        const fetchedStatus = await fetchStatus();
        setStatus(fetchedStatus);
      } catch (error) {
        console.error("Failed to fetch status:", error);
      }
    };

    getCategories();
    getStatus();
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setFormData({ ...formData, [name]: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createStory(formData);
      navigate("/story-management");
    } catch (error) {
      console.error("Failed to create story:", error);
    }
  };

  return (
    <PagesLayout>
      <FormLayout
        title={"Add"}
        formData={formData}
        categories={categories}
        status={status}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        buttonText="Submit"
      />
    </PagesLayout>
  );
}
