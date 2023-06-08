import NewsletterSignup from "../components/news-letter-signup";
import PageContent from "../components/page-content";

function NewsletterPage() {
  return (
    <PageContent title="Join our awesome newsletter!">
      <NewsletterSignup />
    </PageContent>
  );
}

export default NewsletterPage;

export async function action({ request }) {
  const data = await request.formData();
  const email = data.get("email");

  // send to backend newsletter server ...
  console.log(email);
  return { message: "Signup successful!" };
}
