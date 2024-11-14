import SecPost from "../components/section/SecPost";
import SecTitle from "../components/section/SecTitle";
import MainLayout from "../layout/MainLayout";

export default function Pages() {
  return (
    <MainLayout>
      <SecTitle />
      <SecPost />
    </MainLayout>
  );
}
