import { useEffect, useState } from "react";
import { NavLink, useNavigate, useParams, useLocation } from "react-router-dom";
import PagesLayout from "@/components/templates/PagesLayout.jsx";
import { fetchCategories } from "@/api/categories/categoriesApi.js";
import { fetchStatus } from "@/api/status/statusApi.js";
import { updateStory } from "@/api/stories/storiesApi.js";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb.jsx";
import HeadingText from "@/components/atoms/HeadingText/index.jsx";
import { Badge } from "@/components/ui/badge.jsx";
import { ArrowLeft, Plus } from "lucide-react";
import { Label } from "@radix-ui/react-label";
import { Input } from "@/components/ui/input.jsx";
import { Textarea } from "@/components/ui/textarea.jsx";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select.jsx";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip.jsx";
import { Button } from "@/components/ui/button.jsx";
import ContentLayout from "@/components/templates/ContentLayout.jsx";

export default function EditStoryPages() {
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
  const [previewImage, setPreviewImage] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

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

    if (location.state) {
      setFormData(location.state);
      if (location.state.sampul) {
        setPreviewImage(location.state.sampul);
      }
    }
  }, [id, location.state]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setFormData((prevData) => ({ ...prevData, [name]: files[0] }));
      setPreviewImage(URL.createObjectURL(files[0]));
    } else {
      setFormData((prevData) => ({ ...prevData, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateStory(id, formData);
      navigate("/story-management");
    } catch (error) {
      console.error("Failed to update story:", error);
    }
  };

  return (
    <PagesLayout>
      <ContentLayout>
        <Breadcrumb className={`mb-5`}>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/story-management">
                Story Management
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbPage>Edit Story</BreadcrumbPage>
          </BreadcrumbList>
        </Breadcrumb>
        <HeadingText text="Edit Story" />
        <section className="my-5">
          <NavLink to="/story-management">
            <Badge variant="secondary" className="p-2 px-4 gap-1">
              <ArrowLeft size={14} />
              Back
            </Badge>
          </NavLink>
        </section>
        <form
          onSubmit={handleSubmit}
          className="rounded-lg shadow-md p-5 mt-10"
        >
          <section className="grid md:grid-cols-2 my-5 gap-5">
            <div className="w-full grid">
              <Label htmlFor="judul" className="mb-2 font-semibold">
                Judul
              </Label>
              <Input
                id="judul"
                name="judul"
                type="text"
                placeholder="Judul"
                value={formData.judul}
                onChange={handleChange}
              />
            </div>
            <div className="w-full grid">
              <Label htmlFor="penulis" className="mb-2 font-semibold">
                Nama Penulis
              </Label>
              <Input
                id="penulis"
                name="penulis"
                type="text"
                placeholder="Nama Penulis"
                value={formData.penulis}
                onChange={handleChange}
              />
            </div>
          </section>
          <section className="w-full grid">
            <Label htmlFor="sinopsis" className="mb-2 font-semibold">
              Sinopsis
            </Label>
            <Textarea
              id="sinopsis"
              name="sinopsis"
              placeholder="Sinopsis"
              value={formData.sinopsis}
              onChange={handleChange}
            />
          </section>
          <section className="grid md:grid-cols-2 my-5 gap-5">
            <div className="w-full grid">
              <Label htmlFor="kategori" className="mb-2 font-semibold">
                Kategori
              </Label>
              <Select
                value={formData.kategori}
                onValueChange={(value) =>
                  handleChange({ target: { name: "kategori", value } })
                }
              >
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Pilih kategori" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div className="w-full grid">
              <Label htmlFor="tags" className="mb-2 font-semibold">
                Tags/Keyword Cerita
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger className="text-sm text-primary/30">
                      (Pisahkan dengan koma)
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Contoh : Sci-fi,Action</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </Label>
              <Input
                id="tags"
                name="tags"
                type="text"
                placeholder="Keyword/tags"
                value={formData.tags}
                onChange={handleChange}
              />
            </div>
          </section>
          <section className="grid md:grid-cols-2 my-5 gap-5">
            <div className="w-full grid">
              <Label htmlFor="sampul" className="mb-2 font-semibold">
                Sampul
              </Label>
              <Input
                id="sampul"
                name="sampul"
                type="file"
                placeholder="Sampul"
                onChange={handleChange}
              />
            </div>
            <div className="w-full grid">
              <Label htmlFor="status" className="mb-2 font-semibold">
                Status
              </Label>
              <Select
                value={formData.status}
                onValueChange={(value) =>
                  handleChange({ target: { name: "status", value } })
                }
              >
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Pilih status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {status.map((statusItem) => (
                      <SelectItem key={statusItem} value={statusItem}>
                        {statusItem}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </section>
          {previewImage && (
            <img
              src={previewImage}
              alt="Preview"
              className="mt-2 w-28 h-auto"
            />
          )}
          <Button
            type="submit"
            className="mt-5 ml-auto w-full md:w-max flex gap-1"
          >
            <Plus size={16} />
            Update Story
          </Button>
        </form>
      </ContentLayout>
    </PagesLayout>
  );
}
