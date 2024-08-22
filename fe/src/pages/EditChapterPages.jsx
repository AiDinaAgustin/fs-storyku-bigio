import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import PagesLayout from "@/components/templates/PagesLayout.jsx";
import ContentLayout from "@/components/templates/ContentLayout.jsx";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb.jsx";
import HeadingText from "@/components/atoms/HeadingText/index.jsx";
import { NavLink } from "react-router-dom";
import { Badge } from "@/components/ui/badge.jsx";
import { ArrowLeft } from "lucide-react";
import { Label } from "@radix-ui/react-label";
import { Input } from "@/components/ui/input.jsx";
import { Button } from "@/components/ui/button.jsx";
import { updateChapter, fetchChaptersByStoryId } from "@/api/chapters/chaptersApi.js";

export default function EditChapterPages() {
  const { storyId, chapterId } = useParams();
  const navigate = useNavigate();
  const [chapterData, setChapterData] = useState({ title: "", story: "" });
  const [error, setError] = useState(null);

  useEffect(() => {
    const getChapter = async () => {
      try {
        const fetchedChapters = await fetchChaptersByStoryId(storyId);
        const chapter = fetchedChapters.find((ch) => ch.id === parseInt(chapterId));
        setChapterData(chapter || { title: "", story: "" });
      } catch (error) {
        console.error("Failed to fetch chapter:", error);
      }
    };

    getChapter();
  }, [storyId, chapterId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateChapter(storyId, chapterId, chapterData);
      navigate(`/story-management/show/${storyId}`);
    } catch (error) {
      console.error("Failed to update chapter:", error);
      setError("Failed to update chapter. Please try again.");
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setChapterData({ ...chapterData, [name]: value });
  };

  return (
    <PagesLayout>
      <ContentLayout>
        <Breadcrumb className="mb-5">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/story-management">
                Story Management
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href={`/story-management/show/${storyId}`}>
                Show Story
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbPage>Edit Chapter</BreadcrumbPage>
          </BreadcrumbList>
        </Breadcrumb>
        <HeadingText text="Edit Chapter" />
        <section className="my-5">
          <NavLink to={`/story-management/show/${storyId}`}>
            <Badge variant="secondary" className="p-2 px-4 gap-1">
              <ArrowLeft size={14} />
              Back
            </Badge>
          </NavLink>
        </section>
        <form className="rounded-lg shadow-md p-5 mt-10" onSubmit={handleSubmit}>
          <section className="w-100 grid md:grid-cols-1 my-5">
            <Label htmlFor="title" className="mb-2 font-semibold">
              Title
            </Label>
            <Input 
            id="title" 
            name="title" 
            type="text" 
            value={chapterData.title}
              onChange={handleInputChange}
              className="mt-2"
              required />
          </section>
          <section className="w-100 grid">
            <Label htmlFor="story" className="mb-2 font-semibold">
              Story
            </Label>
            <Input 
            id="story" 
            name="story" 
            type="text" 
            value={chapterData.story}
              onChange={handleInputChange}/>
          </section>
          {error && (
            <div className="mb-5 text-red-500">
              <p>{error}</p>
            </div>
          )}
          <Button type="submit" className="mt-5 ml-auto w-full md:w-max flex">
            Update
          </Button>
        </form>
      </ContentLayout>
    </PagesLayout>
  );
}
