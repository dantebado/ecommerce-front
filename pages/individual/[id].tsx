import { GetServerSideProps } from "next";
import useTranslation from "next-translate/useTranslation";
import Head from "next/head";
import Link from "next/link";
import React, { useEffect } from "react";
import { retrieveIndividualPurchase, retrievePurchase } from "../../api/api";
import DefaultLayout from "../../components/layouts/DefaultLayout";
import { IndividualPurchase } from "../../interface/misc.model";

export default function individual(props: { individual: IndividualPurchase }) {
  const { individual } = props;
  const { purchase } = individual;

  const { t } = useTranslation("common");

  return (
    <DefaultLayout>
      <Head>
        <title>WalenGa</title>
        <meta name="og:title" content="WalenGa" />
        <meta name="description" content={t("meta-description-purchase")} />
      </Head>
      <div className="container mx-auto flex flex-row space-x-4 justify-center py-16">
        <Link href={`/purchase/${purchase.id}`}>
          <button>{t("go-to-purchase")}</button>
        </Link>
        <Link href={`/shipment/${individual.shipment.id}`}>
          <button>{t("go-to-shipment")}</button>
        </Link>
      </div>
    </DefaultLayout>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const individualId: any = query.id;
  const response = await retrieveIndividualPurchase(individualId);

  return {
    props: {
      individual: response.data,
    },
  };
};
