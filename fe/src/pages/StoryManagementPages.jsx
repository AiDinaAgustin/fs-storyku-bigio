import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PagesLayout from "../components/templates/PagesLayout.jsx";
import HeadingText from "../components/atoms/HeadingText/index.jsx";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import ContentLayout from "@/components/templates/ContentLayout.jsx";
import { Input } from "@/components/ui/input.jsx";
import { Ellipsis, Eye, Filter, Pencil, Plus, Trash } from "lucide-react";
import { Button } from "@/components/ui/button.jsx";
import { Separator } from "@/components/ui/separator.jsx";
import { Badge } from "@/components/ui/badge.jsx";
import { Link } from "react-router-dom";
import { Label } from "@radix-ui/react-label";
import { fetchStories, deleteStory } from "@/api/stories/storiesApi";
import { fetchCategories } from "@/api/categories/categoriesApi.js";
import { fetchStatus } from "@/api/status/statusApi.js";

export default function StoryManagementPages() {
  const [stories, setStories] = useState([]);
  const [categories, setCategories] = useState([]);
  const [status, setStatus] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const [tempCategory, setTempCategory] = useState("");
  const [tempStatus, setTempStatus] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const itemsPerPage = 5;
  const navigate = useNavigate();

  useEffect(() => {
    const getStories = async () => {
      try {
        const fetchedStories = await fetchStories({
          page: currentPage,
          itemsPerPage,
          category: selectedCategory,
          status: selectedStatus,
          searchQuery,
        });
        setStories(fetchedStories);
      } catch (error) {
        console.error("Failed to fetch stories:", error);
      }
    };

    getStories();
  }, [currentPage, selectedCategory, selectedStatus, searchQuery]);

  useEffect(() => {
    const getCategories = async () => {
      try {
        const fetchedCategories = await fetchCategories();
        setCategories(fetchedCategories);
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      }
    };

    getCategories();
  }, []);

  useEffect(() => {
    const getStatus = async () => {
      try {
        const fetchedStatus = await fetchStatus();
        setStatus(fetchedStatus);
      } catch (error) {
        console.error("Failed to fetch status:", error);
      }
    };

    getStatus();
  }, []);

  const filteredStories = stories.filter((story) => {
    const matchesJudul = story.judul
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesPenulis = story.penulis
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesTags = story.tags.some((tag) =>
      tag.name.toLowerCase().includes(searchQuery.toLowerCase()),
    );

    return (
      (selectedCategory ? story.kategori === selectedCategory : true) &&
      (selectedStatus ? story.status === selectedStatus : true) &&
      (matchesJudul || matchesPenulis || matchesTags)
    );
  });

  const totalPages = Math.ceil(filteredStories.length / itemsPerPage);

  const handlePageChange = (page) => {
    if (page < 1) {
      setCurrentPage(1);
    } else if (page > totalPages) {
      setCurrentPage(totalPages);
    } else {
      setCurrentPage(page);
    }
  };

  const filterStories = () => {
    setSelectedCategory(tempCategory);
    setSelectedStatus(tempStatus);
    setCurrentPage(1);
    setIsDialogOpen(false);
  };

  const resetFilters = () => {
    setTempCategory("");
    setTempStatus("");
  };

  const cancelFilters = () => {
    setIsDialogOpen(false);
  };

  const handleDelete = async (id) => {
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this story?",
    );
    if (!isConfirmed) {
      return;
    }

    try {
      await deleteStory(id);
      setStories((prevStories) =>
        prevStories.filter((story) => story.id !== id),
      );
    } catch (error) {
      console.error("Failed to delete story:", error);
    }
  };

  const handleEdit = (story) => {
    const storyData = {
      judul: story.judul,
      penulis: story.penulis,
      sinopsis: story.sinopsis,
      kategori: story.kategori,
      tags: story.tags.map((tag) => tag.name).join(", "),
      status: story.status,
      sampul: story.sampul,
    };
    navigate(`/story-management/edit/${story.id}`, { state: storyData });
  };

  const handleShow = (story) => {
    navigate(`/story-management/show/${story.id}`, { state: story });
  };

  const currentStories = filteredStories.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  const getPageNumbers = () => {
    const pages = [];
    const startPage = Math.max(1, currentPage - 1);
    const endPage = Math.min(totalPages, currentPage + 1);

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    return pages;
  };

  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, filteredStories.length);

  return (
    <>
      <PagesLayout>
        <ContentLayout>
          <HeadingText text="Stories" />
          <div className="rounded-lg shadow-md p-5 mt-10">
            <section className="grid md:grid-cols-2 my-5">
              <Input
                type="text"
                placeholder="Search for stories"
                className="md:w-1/2 w-100 bg-gray-100"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <div className="md:justify-end justify-center flex gap-3 md:mt-0 mt-5">
                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                  <DialogTrigger asChild>
                    <Button
                      className={`rounded-full w-max shadow-sm`}
                      variant={`outline`}
                    >
                      <Filter size={16} />
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Filter</DialogTitle>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="category" className="text-right">
                          Category
                        </Label>
                        <Select
                          value={tempCategory}
                          onValueChange={(value) => setTempCategory(value)}
                        >
                          <SelectTrigger className="col-span-3">
                            <SelectValue placeholder="Select category" />
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
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="status" className="text-right">
                          Status
                        </Label>
                        <Select
                          value={tempStatus}
                          onValueChange={(value) => setTempStatus(value)}
                        >
                          <SelectTrigger className="col-span-3">
                            <SelectValue placeholder="Select status" />
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
                    </div>
                    <DialogFooter>
                      <div className="md:flex grid md:w-max w-full mr-auto">
                        <Button variant="outline" onClick={resetFilters}>
                          Reset
                        </Button>
                      </div>
                      <div className="md:flex grid md:w-max w-full gap-2">
                        <Button variant="outline" onClick={cancelFilters}>
                          Cancel
                        </Button>
                        <Button type="submit" onClick={filterStories}>
                          Apply
                        </Button>
                      </div>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
                <Separator orientation="vertical" />
                <Link to={"/story-management/create"}>
                  <Button className={`rounded-full w-max gap-1 shadow-sm`}>
                    <Plus size={16} />
                    Add Story
                  </Button>
                </Link>
              </div>
            </section>
            <Table>
              <TableCaption>A list of your recent stories.</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">No</TableHead>
                  <TableHead>Title</TableHead>
                  <TableHead>Writers</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Keyword</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {currentStories.map((story, index) => (
                  <TableRow key={index}>
                    <TableCell>
                      {(currentPage - 1) * itemsPerPage + index + 1}
                    </TableCell>
                    <TableCell>{story.judul}</TableCell>
                    <TableCell>{story.penulis}</TableCell>
                    <TableCell>{story.kategori}</TableCell>
                    <TableCell>
                      {story.tags.map((tag) => (
                        <Badge key={tag.id} className={`grid gap-2 w-max`}>
                          {tag.name}
                        </Badge>
                      ))}
                    </TableCell>
                    <TableCell>
                      <Badge>{story.status}</Badge>
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
                                variant={`outline`}
                                onClick={() => handleShow(story)}
                              >
                                <Eye size={16} />
                                Show
                              </Button>
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Button
                                className={`w-full flex gap-1`}
                                onClick={() => handleEdit(story)}
                              >
                                <Pencil size={16} />
                                Edit
                              </Button>
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Button
                                variant="destructive"
                                onClick={() => handleDelete(story.id)}
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
            <section className="md:flex justify-between mt-5 items-center">
              <div className="w-full md:text-start text-center">
                <p className={`text-sm text-gray-500`}>
                  Showing {startItem}-{endItem} of {filteredStories.length}{" "}
                  stories
                </p>
              </div>
              <Pagination className={`flex md:justify-end mt-5`}>
                <PaginationContent className="flex flex-wrap justify-center md:justify-end gap-2">
                  <PaginationItem>
                    <PaginationPrevious
                      href="#"
                      onClick={() => handlePageChange(currentPage - 1)}
                      disabled={currentPage === 1}
                    />
                  </PaginationItem>
                  {getPageNumbers().map((page) => (
                    <PaginationItem key={page}>
                      <PaginationLink
                        href="#"
                        onClick={() => handlePageChange(page)}
                        className={`${
                          currentPage === page ? "bg-primary text-white" : ""
                        }`}
                      >
                        {page}
                      </PaginationLink>
                    </PaginationItem>
                  ))}
                  <PaginationItem>
                    <PaginationNext
                      href="#"
                      onClick={() => handlePageChange(currentPage + 1)}
                      disabled={currentPage === totalPages}
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </section>
          </div>
        </ContentLayout>
      </PagesLayout>
    </>
  );
}
