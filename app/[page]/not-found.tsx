import { ErrorPage } from "@/components/ErrorPage/ErrorPage";

export default function NotFound() {
  return <ErrorPage title="Page Not Found" message="The page you're looking for doesn't exist." statusCode={404} />;
}
