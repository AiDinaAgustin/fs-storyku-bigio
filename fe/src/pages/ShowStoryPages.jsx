import { useEffect, useState } from "react";
import { useParams, NavLink, Link, useNavigate } from "react-router-dom";
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
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import HeadingText from "@/components/atoms/HeadingText/index.jsx";
import { Badge } from "@/components/ui/badge.jsx";
import { ArrowLeft, Eye, Ellipsis, Pencil, Trash } from "lucide-react";
import { fetchStoryById } from "@/api/stories/storiesApi.js";
import {
  fetchChaptersByStoryId,
  deleteChapter,
} from "@/api/chapters/chaptersApi.js";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button.jsx";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";

export default function ShowStoryPages() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [story, setStory] = useState(null);
  const [chapters, setChapters] = useState([]);

  useEffect(() => {
    const getStoryAndChapters = async () => {
      try {
        const fetchedStory = await fetchStoryById(id);
        setStory(fetchedStory);

        const fetchedChapters = await fetchChaptersByStoryId(id);
        setChapters(fetchedChapters);
      } catch (error) {
        console.error("Failed to fetch story or chapters:", error);
      }
    };

    getStoryAndChapters();
  }, [id]);

  const handleDeleteChapter = async (chapterId) => {
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this chapter?",
    );
    if (!isConfirmed) {
      return; // Abort delete operation if user cancels
    }

    try {
      await deleteChapter(id, chapterId);
      setChapters(chapters.filter((chapter) => chapter.id !== chapterId));
    } catch (error) {
      console.error("Failed to delete chapter:", error);
    }
  };

  const handleShow = (chapter) => {
    // Implementasi untuk menampilkan detail chapter
  };

  const handleEdit = (chapter) => {
    navigate(`/story-management/${id}/edit-chapter/${chapter.id}`);
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
            <BreadcrumbPage>Show Story</BreadcrumbPage>
          </BreadcrumbList>
        </Breadcrumb>
        <HeadingText text="Show Story" />
        <section className="my-5">
          <NavLink to="/story-management">
            <Badge variant="secondary" className="p-2 px-4 gap-1">
              <ArrowLeft size={14} />
              Back
            </Badge>
          </NavLink>
        </section>
        {story && (
          <section className="rounded-lg shadow-md p-5 mt-10">
            <div>
              <strong>Judul:</strong> {story.judul}
            </div>
            <div>
              <strong>Penulis:</strong> {story.penulis}
            </div>
            <div>
              <strong>Sinopsis:</strong> {story.sinopsis}
            </div>
            <div>
              <strong>Kategori:</strong> {story.kategori}
            </div>
            <div>
              <strong>Tags:</strong>{" "}
              <Badge>{story.tags.map((tag) => tag.name).join(", ")}</Badge>
            </div>
            <div>
              <strong>Status:</strong> {story.status}
            </div>
            <div>
              <strong>Sampul: </strong>
              <Dialog>
                <DialogTrigger>
                  <Badge className="flex gap-1">
                    <Eye size={14} />
                    Show
                  </Badge>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>{story.judul}</DialogTitle>
                    <DialogDescription>
                      {story.sampul && (
                        <img
                          src={story.sampul}
                          alt={story.judul}
                          className="w-full"
                        />
                      )}
                    </DialogDescription>
                  </DialogHeader>
                </DialogContent>
              </Dialog>
            </div>
            <Link to={`/story-management/${id}/add-chapter`}>
              <Button>Add Chapter</Button>
            </Link>
          </section>
        )}
        {chapters.length > 0 && (
          <section className="mt-10">
            <HeadingText text="Chapters" />
            <div className="rounded-lg shadow-md p-5 mt-10">
              <Table>
                <TableCaption>A list of chapters for this story.</TableCaption>
                <TableHeader>
                  <TableRow>
                    <TableHead>Title</TableHead>
                    <TableHead>Story</TableHead>
                    <TableHead>Last Updated</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {chapters.map((chapter) => (
                    <TableRow key={chapter.id}>
                      <TableCell>{chapter.title}</TableCell>
                      <TableCell>{chapter.story}</TableCell>
                      <TableCell>
                        {new Date(chapter.updatedAt).toLocaleDateString(
                          "id-ID",
                          {
                            day: "numeric",
                            month: "long",
                            year: "numeric",
                          },
                        )}
                      </TableCell>
                      <TableCell>
                        <Button variant="primary">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Ellipsis size={16} />
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                              <DropdownMenuLabel className={`text-center`}>
                                Actions
                              </DropdownMenuLabel>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem>
                                <Button
                                  className={`w-full flex gap-1`}
                                  onClick={() => handleEdit(chapter)}
                                >
                                  <Pencil size={16} />
                                  Edit
                                </Button>
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Button
                                  variant="destructive"
                                  onClick={() =>
                                    handleDeleteChapter(chapter.id)
                                  }
                                  className={`w-full flex gap-1`}
                                >
                                  <Trash size={16} />
                                  Delete
                                </Button>
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </section>
        )}
      </ContentLayout>
    </PagesLayout>
  );
}
