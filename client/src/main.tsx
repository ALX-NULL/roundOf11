import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./HomePage.tsx";
import TopicPage from "./TopicPage.tsx";
import "./index.css";
import NotFoundPage from "./NotFoundPage.tsx";
import { getTopicDetails } from "./utils/loaders.ts";

const router = createBrowserRouter([
  { path: "/", element: <HomePage />, errorElement: <NotFoundPage /> },
  {
    path: "/topic",
    element: <TopicPage />,
    loader: getTopicDetails,
    errorElement: <NotFoundPage />,
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
