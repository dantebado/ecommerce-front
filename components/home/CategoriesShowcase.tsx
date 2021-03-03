import cogoToast from "cogo-toast";
import useTranslation from "next-translate/useTranslation";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { retrieveCategories } from "../../api/api";

export default function CategoriesShowcase() {
  const [categories, setCategories] = useState([]);
  const { t } = useTranslation("common");

  useEffect(() => {
    retrieveCategories()
      .then((response) => {
        setCategories(response.data.results);
      })
      .catch((err) => cogoToast.error(t("fetching-categories-error")));
  }, []);

  return (
    <div className="container mx-auto py-3 flex md:space-x-3">
      {categories.map((v, i, a) => (
        <Link key={v.id} href={`/search?category=${v.id}`}>
          <div className="w-full my-3 md:my-0 md:w-1/3 px-4 py-6 hover:bg-green-300 cursor-pointer transition-all text-center shadow-lg">
            <p className="font-bold uppercase">{v.description}</p>
          </div>
        </Link>
      ))}
    </div>
  );
}
