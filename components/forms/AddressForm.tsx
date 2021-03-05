import useTranslation from "next-translate/useTranslation";
import React, { useEffect, useState } from "react";
import { Address } from "../../interface/misc.model";

export default function AddressForm(props: {
  value: Address;
  onChange: (v: any) => any;
}) {
  const [address, setAddress] = useState({ ...props.value });
  const { t } = useTranslation("common");

  const inputHandler = (field: string, value: any) => {
    setAddress({
      ...address,
      [field]: value,
    });
  };

  useEffect(() => {
    if (props.onChange) {
      props.onChange(address);
    }
  }, [address]);

  return (
    <div>
      <div className="mb-3">
        <input
          type="text"
          autoComplete="false"
          placeholder={t("form-placeholder-address")}
          className="w-full"
          value={address.address_line}
          onChange={(e) => inputHandler("address_line", e.target.value)}
        />
      </div>
      <div className="flex flex-row items-center mb-3">
        <div className="w-1/2 md:w-3/4 pr-3">
          <input
            type="text"
            autoComplete="false"
            placeholder={t("form-placeholder-floor-apt")}
            className="w-full"
            value={address.floor_apt}
            onChange={(e) => inputHandler("floor_apt", e.target.value)}
          />
        </div>
        <div className="w-1/2 md:w-1/4">
          <input
            type="text"
            autoComplete="false"
            placeholder={t("form-placeholder-zip")}
            className="w-full"
            value={address.postal_code}
            onChange={(e) => inputHandler("postal_code", e.target.value)}
          />
        </div>
      </div>
      <div className="flex flex-row items-center">
        <div className="w-1/2 pr-3">
          <input
            type="text"
            autoComplete="false"
            placeholder={t("form-placeholder-city")}
            className="w-full"
            value={address.city}
            onChange={(e) => inputHandler("city", e.target.value)}
          />
        </div>
        <div className="w-1/2">
          <input
            type="text"
            autoComplete="false"
            placeholder={t("form-placeholder-state")}
            className="w-full"
            value={address.state}
            onChange={(e) => inputHandler("state", e.target.value)}
          />
        </div>
      </div>
    </div>
  );
}
