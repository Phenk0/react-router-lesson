import {
  Await,
  defer,
  json,
  redirect,
  useRouteLoaderData,
} from "react-router-dom";
import EventItem from "../components/EventItem";
import EventsList from "../components/EventsList";
import { Suspense } from "react";

const EventDetailPage = () => {
  const { event, events } = useRouteLoaderData("event-detail");
  console.log(event);

  return (
    <>
      <Suspense fallback={<p>Loading...</p>}>
        <Await resolve={event}>
          {(loadedEvent) => <EventItem event={loadedEvent} />}
        </Await>
      </Suspense>
      <Suspense fallback={<p>Loading...</p>}>
        <Await resolve={events}>
          {(loadedEvents) => <EventsList events={loadedEvents} />}
        </Await>
      </Suspense>
    </>
  );
};
export default EventDetailPage;

const loadEvent = async (id) => {
  const response = await fetch("http://localhost:8080/events/" + id);
  if (!response.ok) {
    throw json(
      { message: "Failed to fetch details for selected event." },
      { status: 500 }
    );
  } else {
    const responseData = await response.json();
    return responseData.event;
  }
};
const loadEvents = async () => {
  const response = await fetch("http://localhost:8080/events");

  if (!response.ok) {
    throw json(
      { message: "Could not fetch events." },
      {
        status: 500,
      }
    );
  } else {
    const responseData = await response.json();
    return responseData.events;
  }
};
export const loader = async ({ params }) => {
  const id = params.id;
  // to render separately elements needs to await first, second.. element
  return defer({ event: await loadEvent(params.id), events: loadEvents() });
};

export const action = async ({ params, request }) => {
  const id = params.id;

  const response = await fetch("http://localhost:8080/events/" + id, {
    method: request.method,
  });
  if (!response.ok) {
    throw json({ message: "Could not delete event." }, { status: 500 });
  }
  return redirect("/events");
};
