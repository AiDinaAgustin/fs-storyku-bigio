import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LandingPages from "./pages/LandingPages.jsx";
import StoryManagementPages from "./pages/StoryManagementPages.jsx";
import CreateStoryPages from "@/pages/CreateStoryPages.jsx";
import EditStoryPages from "@/pages/EditStoryPages.jsx";
import ChapterFormPages from "@/pages/ChapterFormPages.jsx";
import ShowStoryPages from "@/pages/ShowStoryPages.jsx";
import EditChapterPages from "@/pages/EditChapterPages.jsx";


const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPages />,
  },
  {
    path: "/story-management",
    element: <StoryManagementPages />,
  },
  {
    path: "/story-management/create",
    element: <CreateStoryPages />,
  },
  {
    path: "/story-management/edit/:id",
    element: <EditStoryPages />,
  },
  {
    path: "/story-management/show/:id",
    element: <ShowStoryPages />,
  },
  {
    path: "/story-management/:storyId/add-chapter",
    element: <ChapterFormPages />,
  },
  {
    path: "/story-management/:storyId/edit-chapter/:chapterId",
    element: <EditChapterPages />,
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
