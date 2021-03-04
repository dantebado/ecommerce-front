import axios from "axios";
import cogoToast from "cogo-toast";
import useTranslation from "next-translate/useTranslation";
import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";

export default function ImageUploader(props: {
  text?: string;
  callback?: (url: string) => any;
}) {
  const { t } = useTranslation("common");
  const onDrop = useCallback((acceptedFiles) => {
    cogoToast.info(t("upload-processing"));
    readFile(acceptedFiles[0]).then((content) => {
      axios
        .post("https://wc-commons.herokuapp.com/files/imgur", {
          file: content,
        })
        .then((response) => {
          let imageUrl = response.data.url;
          if (props.callback) {
            props.callback(imageUrl);
          }
        })
        .catch((err) => {
          cogoToast.error(t("upload-error"));
        });
    });
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const readFile = async (file: File): Promise<string> => {
    return new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        return resolve((e.target as FileReader).result as string);
      };
      reader.onerror = (e) => {
        console.error(`FileReader failed on file ${file.name}.`);
        return reject(null);
      };
      if (!file) {
        console.error("No file to read.");
        return reject(null);
      }
      reader.readAsDataURL(file);
    });
  };

  return (
    <div
      className={`px-3 py-6 border border-dashed background-white cursor-pointer text-center`}
      {...getRootProps()}
    >
      <input {...getInputProps()} />
      {isDragActive ? (
        <p>{props.text || "Arrastrá tus archivos aquí "}</p>
      ) : (
        <p>{props.text || "Arrastrá tus archivos aquí "}</p>
      )}
    </div>
  );
}
