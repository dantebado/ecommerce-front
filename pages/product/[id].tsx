import cogoToast from "cogo-toast";
import { GetServerSideProps } from "next";
import useTranslation from "next-translate/useTranslation";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addProductToCart,
  retrieveProduct,
  retrieveProductReviews,
} from "../../api/api";
import DefaultLayout from "../../components/layouts/DefaultLayout";
import ReviewForm from "../../components/products/ReviewForm";
import CommentaryStars from "../../components/utils/CommentaryStars";
import CurrencyDisplay from "../../components/utils/CurrencyDisplay";
import { Product } from "../../interface/misc.model";
import { actionSetActiveCart } from "../../redux/reducers/ActiveCart";
import {
  actionSetProgress,
  actionsHideProgress,
} from "../../redux/reducers/Progress";
import { StateTypes } from "../../redux/Store";

export default function ProductViewer(props: { product: Product }) {
  const [product] = useState(props.product);
  const activeCart = useSelector((state: StateTypes) => state.activeCart);
  const [reviews, setReviews] = useState([]);
  const [count, setCount] = useState(0);
  const dispatch = useDispatch();
  const router = useRouter();
  const { t } = useTranslation("common");

  let countOptions = [];
  for (let i = 0; i < Math.min(10, product.current_stock); i++) {
    countOptions.push(i);
  }

  useEffect(() => {
    retrieveProductReviews(product.id)
      .then((response) => {
        setReviews(response.data.results);
      })
      .catch((err) => {});
  }, []);

  const submitHandler = (e) => {
    e.preventDefault();
    let payload = {
      productId: product.id,
      count: count,
    };

    dispatch(actionSetProgress(""));
    addProductToCart(activeCart?.id, [payload])
      .then((cart) => {
        dispatch(actionSetActiveCart(cart.data));
        cogoToast.success(t("item-added-success"));
        router.push("/cart");
      })
      .catch((err) => cogoToast.error(t("item-added-error")))
      .finally(() => dispatch(actionsHideProgress()));
  };

  const addReview = (review) => {
    setReviews([review, ...reviews]);
  };

  return (
    <DefaultLayout>
      <Head>
        <title>{product.display_name} - WalenGa</title>
        <meta name="og:title" content={`${product.display_name} - WalenGa`} />
        <meta name="description" content={product.description} />
        <meta property="og:image" content={product.featured_photo_url} />
        <meta name="twitter:card" content="summary_large_image"></meta>
      </Head>
      <div className="container mx-auto px-4 py-6 text-center dark:text-white">
        <div className="md:flex flex-row items-start justify-between">
          <div className="md:w-2/3">
            <p className="mb-3 text-3xl font-bold uppercase">
              {product.display_name}
            </p>
            <p>{product.description}</p>

            <p className="my-3 text-xl font-bold">
              <CurrencyDisplay amount={product.unitary_price} /> /{" "}
              {product.measure_unit}
            </p>

            <div className="md:w-1/3 mx-auto mb-3 my-6">
              <img className="shadow-md" src={product.featured_photo_url} />
            </div>
            <div className="my-3 mb-6 md:flex flex-row overflow-x-auto border-t flex-wrap border-b">
              {product.photos_url.map((v, i, a) => (
                <Fragment key={i}>
                  <img className="w-1/2 md:w-1/4" src={v.photo} />
                </Fragment>
              ))}
            </div>

            <div className="md:flex flex-row items-center md:w-1/2 md:mx-auto mt-6">
              <div className="md:w-1/2 px-4">
                <select
                  className="w-full py-2 px-2 dark:text-black"
                  value={count}
                  autoComplete="false"
                  onChange={(e) => setCount(parseInt(e.target.value))}
                >
                  {countOptions.map((v, i, a) => (
                    <option key={v} value={v}>
                      {v} {product.measure_unit}
                      {v == 1 ? "" : "s"}
                    </option>
                  ))}
                </select>
              </div>
              <div className="md:w-1/2 px-4 mt-4 md:mt-0">
                <button
                  className="px-6 py-3 w-full"
                  disabled={count == 0 || !activeCart?.id}
                  onClick={submitHandler}
                >
                  {count === 0 ? t("select-quantity-title") : t("add-to-cart")}
                </button>
              </div>
            </div>
          </div>
          <div className="md:w-1/3 text-left mt-6 md:mt-0 px-3">
            <p className="uppercase text-2xl">{t("comments-title")}</p>
            {reviews.map((v, i, a) => (
              <div className="my-3 border-b pb-3">
                <CommentaryStars count={v.rating} />
                <p className="text-lg font-bold">{v.author_name} dijo:</p>
                <p>{v.commentary}</p>
              </div>
            ))}
            <ReviewForm product={product} callback={addReview} />
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const productId: any = query.id;
  const product = await retrieveProduct(productId);

  return {
    props: {
      product: product.data,
    },
  };
};
