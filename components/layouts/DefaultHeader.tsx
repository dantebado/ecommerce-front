import useTranslation from "next-translate/useTranslation";
import Link from "next/link";
import React from "react";
import { useSelector } from "react-redux";
import { StateTypes } from "../../redux/Store";

export default function DefaultHeader() {
  const loggedUser = useSelector((state: StateTypes) => state.loggedUser);
  const { t } = useTranslation("common");

  return (
    <header className={`py-3 bg-comm-l`}>
      <div className="container mx-auto text-center flex flex-row items-center justify-between">
        <div className="w-1/3 pl-4">
          <Link href="/cart">
            <a>
              <svg
                width="36"
                height="36"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M5.79166 2H1V4H4.2184L6.9872 16.6776H7V17H20V16.7519L22.1932 7.09095L22.5308 6H6.6552L6.08485 3.38852L5.79166 2ZM19.9869 8H7.092L8.62081 15H18.3978L19.9869 8Z"
                  fill="currentColor"
                />
                <path
                  d="M10 22C11.1046 22 12 21.1046 12 20C12 18.8954 11.1046 18 10 18C8.89543 18 8 18.8954 8 20C8 21.1046 8.89543 22 10 22Z"
                  fill="currentColor"
                />
                <path
                  d="M19 20C19 21.1046 18.1046 22 17 22C15.8954 22 15 21.1046 15 20C15 18.8954 15.8954 18 17 18C18.1046 18 19 18.8954 19 20Z"
                  fill="currentColor"
                />
              </svg>
            </a>
          </Link>
        </div>
        <div className="w-1/3">
          <Link href="/">
            <a className="mx-auto">
              <img className="w-1/2 md:w-1/12 mx-auto" src="/assets/logo.png" />
            </a>
          </Link>
        </div>
        <div className="w-1/3 text-right flex justify-end pr-3">
          {loggedUser.magicToken ? (
            <Link href="/account">
              <a>
                <svg
                  width="36"
                  height="36"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M8 11C10.2091 11 12 9.20914 12 7C12 4.79086 10.2091 3 8 3C5.79086 3 4 4.79086 4 7C4 9.20914 5.79086 11 8 11ZM8 9C9.10457 9 10 8.10457 10 7C10 5.89543 9.10457 5 8 5C6.89543 5 6 5.89543 6 7C6 8.10457 6.89543 9 8 9Z"
                    fill="currentColor"
                  />
                  <path
                    d="M11 14C11.5523 14 12 14.4477 12 15V21H14V15C14 13.3431 12.6569 12 11 12H5C3.34315 12 2 13.3431 2 15V21H4V15C4 14.4477 4.44772 14 5 14H11Z"
                    fill="currentColor"
                  />
                  <path d="M22 11H16V13H22V11Z" fill="currentColor" />
                  <path d="M16 15H22V17H16V15Z" fill="currentColor" />
                  <path d="M22 7H16V9H22V7Z" fill="currentColor" />
                </svg>
              </a>
            </Link>
          ) : (
            <Link href="/login">
              <a>
                <svg
                  width="36"
                  height="36"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M16 7C16 9.20914 14.2091 11 12 11C9.79086 11 8 9.20914 8 7C8 4.79086 9.79086 3 12 3C14.2091 3 16 4.79086 16 7ZM14 7C14 8.10457 13.1046 9 12 9C10.8954 9 10 8.10457 10 7C10 5.89543 10.8954 5 12 5C13.1046 5 14 5.89543 14 7Z"
                    fill="currentColor"
                  />
                  <path
                    d="M16 15C16 14.4477 15.5523 14 15 14H9C8.44772 14 8 14.4477 8 15V21H6V15C6 13.3431 7.34315 12 9 12H15C16.6569 12 18 13.3431 18 15V21H16V15Z"
                    fill="currentColor"
                  />
                </svg>
              </a>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
