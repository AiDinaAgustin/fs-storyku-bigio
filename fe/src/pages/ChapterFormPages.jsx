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
import { createChapter } from "@/api/chapters/chaptersApi.js";

export default function ChapterFormPages() {
  const { storyId } = useParams();
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log("Story ID:", storyId);
  }, [storyId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const chapterData = Object.fromEntries(formData.entries());

    try {
      await createChapter(storyId, chapterData);
      navigate(`/story-management/show/${storyId}`);
    } catch (error) {
      console.error("Failed to create chapter:", error);
      setError("Failed to create chapter. Please try again.");
    }
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
              <BreadcrumbPage>Add Chapter</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <HeadingText text="Add Chapter" />
        <section className="my-5">
          <NavLink to="/story-management">
            <Badge variant="secondary" className="p-2 px-4 gap-1">
              <ArrowLeft size={14} />
              Back
            </Badge>
          </NavLink>
        </section>
        {error && <div className="error-message">{error}</div>}
        <form className="rounded-lg shadow-md p-5 mt-10" onSubmit={handleSubmit}>
          <section className="w-100 grid md:grid-cols-1 my-5">
            <Label htmlFor="title" className="mb-2 font-semibold">
              Title
            </Label>
            <Input id="title" name="title" type="text" placeholder="Judul" />
          </section>
          <section className="w-100 grid">
            <Label htmlFor="story" className="mb-2 font-semibold">
              Story
            </Label>
            <Input id="story" name="story" type="text" placeholder="Cerita" />
          </section>
          <Button type="submit" className="mt-5 ml-auto w-full md:w-max flex">
            Save
          </Button>
        </form>
      </ContentLayout>
    </PagesLayout>
  );
}
