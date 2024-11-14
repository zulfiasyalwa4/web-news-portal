import SecBlog from "../components/section/SecBlog";
import SecHero from "../components/section/SecHero";
import MainLayout from "../layout/MainLayout";

export default function Home() {
  return (
    <MainLayout>
      <SecHero />
      <SecBlog />
    </MainLayout>
  );
}
