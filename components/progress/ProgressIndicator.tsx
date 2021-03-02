import React, { Fragment } from "react";
import { useSelector } from "react-redux";
import { StateTypes } from "../../redux/Store";
import styles from "./styles.module.scss";

export default function ProgressIndicator() {
  const progress = useSelector((state: StateTypes) => state.progress);

  return (
    <Fragment>
      {progress.active ? (
        <div
          className={`block fixed top-0 botton-0 left-0 right-0 w-screen h-screen flex flex-row items-center justify-center ${styles.ProgressWrapper}`}
        >
          <div className={`container text-center`}>
            <img src="/assets/logo.png" />
            <p>{progress.message}</p>
          </div>
        </div>
      ) : (
        <span></span>
      )}
    </Fragment>
  );
}
