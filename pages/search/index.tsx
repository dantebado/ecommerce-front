import cogoToast from "cogo-toast";
import { useAnimation } from "framer-motion";
import { GetServerSideProps } from "next";
import useTranslation from "next-translate/useTranslation";
import React, { useEffect, useState } from "react";
import { queryProducts, retrieveCategories } from "../../api/api";
import DefaultLayout from "../../components/layouts/DefaultLayout";
import ProductGridComponent from "../../components/products/ProductGridComponent";

export default function index(props) {
  const [category, setCategory] = useState(props.query.category || "");
  const [query, setQuery] = useState(props.query.query || "");
  const [matches, setMatches] = useState({
    next: null,
    previous: null,
    results: [],
    count: 0,
  });
  const [categories, setCategories] = useState([]);
  const [page, setPage] = useState(1);
  const { t } = useTranslation("common");

  useEffect(() => {
    retrieveCategories()
      .then((response) => {
        setCategories(response.data.results);
      })
      .catch((err) => cogoToast.error(t("fetching-categories-error")));
    refreshData(null);
  }, []);

  useEffect(() => {
    refreshData(null);
  }, [page]);

  const refreshData = (e) => {
    if (e) e.preventDefault();
    queryProducts(page, category, query, "")
      .then((response) => {
        const data: any = response.data;
        setMatches(data);
      })
      .catch((err) => cogoToast.error(t("fetching-products-error")));
  };

  return (
    <DefaultLayout>
      <div className="container mx-auto p-2">
        <div className="pb-3 border-b">
          <form action="" onSubmit={refreshData}>
            <input
              className="w-full"
              type="text"
              value={query}
              placeholder={t("form-placeholder-search")}
              onChange={(e) => setQuery(e.target.value)}
            />
            <select
              className="w-full my-3"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="">
                {t("form-placeholder-category-selection")}
              </option>
              {categories.map((v, i, a) => (
                <option key={v.id} value={v.id}>
                  {v.description}
                </option>
              ))}
            </select>
            <div>
              <button
                className="ml-auto block px-6 w-full md:w-auto"
                type="submit"
              >
                {t("form-placeholder-search")}
              </button>
            </div>
          </form>
        </div>
        <div className="md:flex flex-row flex-wrap">
          {matches.results.map((v, i, a) => (
            <div key={`${i}-${v.id}`} className="md:w-1/3">
              <ProductGridComponent product={v} />
            </div>
          ))}
        </div>
        <div className="flex flex-row justify-center mt-4 space-x-3">
          <button
            disabled={!matches.previous}
            onClick={(e) => setPage(page - 1)}
          >
            {"<"}
          </button>
          <button disabled={!matches.next} onClick={(e) => setPage(page + 1)}>
            {">"}
          </button>
        </div>
      </div>
    </DefaultLayout>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  return {
    props: {
      query: query,
    },
  };
};
