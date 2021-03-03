import CategoriesShowcase from "../components/home/CategoriesShowcase";
import HomeProductsList from "../components/home/HomeProductsList";
import DefaultLayout from "../components/layouts/DefaultLayout";
import FeaturedProductCarrousel from "../components/products/FeaturedProductCarrousel";
import RecommendationsBar from "../components/products/RecommendationsBar";

export default function Home(props) {
  return (
    <DefaultLayout>
      <div className="container mx-auto">
        <FeaturedProductCarrousel />
        <CategoriesShowcase />
        <HomeProductsList />
        <RecommendationsBar />
      </div>
    </DefaultLayout>
  );
}
