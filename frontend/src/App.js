import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootLayout from "./pages/root.layout";
import HomePage from "./pages/home.page";
import EventsPage, { loader as eventsLoader } from "./pages/events.page";
import NewEventPage from "./pages/new-event.page";
import EventDetailPage, {
  loader as eventDetailLoader,
  action as deleteEventAction,
} from "./pages/event-detail.page";
import EditEventPage from "./pages/edit-event.page";
import EventsRootLayout from "./pages/events-root.layout";
import ErrorPage from "./pages/error.page";
import { action as manipulateEventAction } from "./components/EventForm";
import NewsletterPage, {
  action as newsletterAction,
} from "./pages/news-letter.page";

const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    errorElement: <ErrorPage />,
    children: [
      { index: true, Component: HomePage },
      {
        path: "events",
        Component: EventsRootLayout,
        children: [
          {
            index: true,
            Component: EventsPage,
            loader: eventsLoader,
          },
          {
            path: ":id",
            id: "event-detail",
            loader: eventDetailLoader,
            children: [
              {
                index: true,
                Component: EventDetailPage,
                action: deleteEventAction,
              },
              {
                path: "edit",
                Component: EditEventPage,
                action: manipulateEventAction,
              },
            ],
          },
          {
            path: "new",
            Component: NewEventPage,
            action: manipulateEventAction,
          },
        ],
      },
      {
        path: "newsletter",
        Component: NewsletterPage,
        action: newsletterAction,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
