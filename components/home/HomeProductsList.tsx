import React, { useEffect, useState } from "react";
import { queryProducts } from "../../api/api";
import ProductGridComponent from "../products/ProductGridComponent";
import cogoToast from "cogo-toast";
import useTranslation from "next-translate/useTranslation";

export default function HomeProductsList() {
  const [products, setProducts] = useState({
    count: -1,
    results: [],
  });
  const [loading, setLoading] = useState(true);
  const [pageNumber] = useState(1);
  const { t } = useTranslation("common");

  const fetchProducts = () => {
    setLoading(true);
    queryProducts(pageNumber, "", "", "")
      .then((page) => {
        setProducts(page.data);
      })
      .catch((err) => cogoToast.error(t("fetching-products-error")))
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="flex flex-row items-center flex-wrap justify-around">
      {loading ? (
        <p>{t("loading-title")}</p>
      ) : (
        products.results.map((v, i, a) => (
          <div key={v.id} className="w-1/2 md:w-1/4">
            <ProductGridComponent product={v} />
          </div>
        ))
      )}
    </div>
  );
}
