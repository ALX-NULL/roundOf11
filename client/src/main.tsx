import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import HomePage from './HomePage.tsx';
import TopicPage from './TopicPage.tsx';
import './index.css'

const router = createBrowserRouter([
  {path: '/', element: <HomePage />},
  {path: '/topic', element: <TopicPage />}
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
