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
  const { t } = useTranslation();

  const fetchProducts = () => {
    setLoading(true);
    queryProducts(pageNumber)
      .then((page) => {
        setProducts(page.data);
      })
      .catch((err) => cogoToast.error("Error obteniendo lista de productos"))
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="flex flex-row items-center flex-wrap justify-around p-2">
      {loading ? (
        <p>{t("loading")}</p>
      ) : (
        products.results.map((v, i, a) => (
          <div key={i} className="w-1/2 md:w-1/4">
            <ProductGridComponent product={v} />
          </div>
        ))
      )}
    </div>
  );
}
