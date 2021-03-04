import useTranslation from "next-translate/useTranslation";
import Link from "next/link";
import CategoriesShowcase from "../components/home/CategoriesShowcase";
import HomeProductsList from "../components/home/HomeProductsList";
import DefaultLayout from "../components/layouts/DefaultLayout";
import FeaturedProductCarrousel from "../components/products/FeaturedProductCarrousel";
import RecommendationsBar from "../components/products/RecommendationsBar";

export default function Home(props) {
  const { t } = useTranslation("common");

  return (
    <DefaultLayout>
      <div className="container mx-auto">
        <FeaturedProductCarrousel />
        <Link href="/search">
          <button className="w-full block py-6 uppercase mt-3 font-bold text-3xl">
            {t("explore-title")}
          </button>
        </Link>
        <CategoriesShowcase />
        <HomeProductsList />
        <RecommendationsBar />
      </div>
    </DefaultLayout>
  );
}
