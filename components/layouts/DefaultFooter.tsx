import React from "react";
import CurrencySelector from "../utils/CurrencySelector";

export default function DefaultFooter() {
  return (
    <footer className="border-t py-4 text-center text-white bg-black">
      <CurrencySelector />
    </footer>
  );
}
