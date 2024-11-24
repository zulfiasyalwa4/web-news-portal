import SecBlogPost from "../components/section/SecBlogPost";
import SecSinglePost from "../components/section/SecSinglePost";
import MainLayout from "../layout/MainLayout";

export default function SinglePost() {
  return (
    <MainLayout>
      <SecSinglePost/>
      <SecBlogPost />
    </MainLayout>
  );
}
