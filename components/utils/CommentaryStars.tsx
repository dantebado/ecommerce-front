import React, { Fragment } from "react";

export default function CommentaryStars(props: { count: number }) {
  const { count } = props;

  let arrf = [];
  let arre = [];

  for (let a = 0; a < count; a++) {
    arrf.push("a");
  }
  for (let a = arrf.length; a < 5; a++) {
    arre.push("a");
  }

  console.log(arrf.length, arre.length);

  return (
    <div className="block mb-1">
      {arrf.map((v, i) => (
        <svg
          key={`${i}-f`}
          version="1.1"
          className="inline mr-1"
          width="16"
          height="16"
          viewBox="0 0 19.481 19.481"
        >
          <g>
            <path d="m10.201,.758l2.478,5.865 6.344,.545c0.44,0.038 0.619,0.587 0.285,0.876l-4.812,4.169 1.442,6.202c0.1,0.431-0.367,0.77-0.745,0.541l-5.452-3.288-5.452,3.288c-0.379,0.228-0.845-0.111-0.745-0.541l1.442-6.202-4.813-4.17c-0.334-0.289-0.156-0.838 0.285-0.876l6.344-.545 2.478-5.864c0.172-0.408 0.749-0.408 0.921,0z" />
          </g>
        </svg>
      ))}
      {arre.map((v, i) => (
        <svg
          version="1.1"
          x="0px"
          y="0px"
          className="inline mr-1"
          width="16"
          height="16"
          viewBox="0 0 487.222 487.222"
        >
          <g>
            <path
              d="M486.554,186.811c-1.6-4.9-5.8-8.4-10.9-9.2l-152-21.6l-68.4-137.5c-2.3-4.6-7-7.5-12.1-7.5l0,0c-5.1,0-9.8,2.9-12.1,7.6
		l-67.5,137.9l-152,22.6c-5.1,0.8-9.3,4.3-10.9,9.2s-0.2,10.3,3.5,13.8l110.3,106.9l-25.5,151.4c-0.9,5.1,1.2,10.2,5.4,13.2
		c2.3,1.7,5.1,2.6,7.9,2.6c2.2,0,4.3-0.5,6.3-1.6l135.7-71.9l136.1,71.1c2,1,4.1,1.5,6.2,1.5l0,0c7.4,0,13.5-6.1,13.5-13.5
		c0-1.1-0.1-2.1-0.4-3.1l-26.3-150.5l109.6-107.5C486.854,197.111,488.154,191.711,486.554,186.811z M349.554,293.911
		c-3.2,3.1-4.6,7.6-3.8,12l22.9,131.3l-118.2-61.7c-3.9-2.1-8.6-2-12.6,0l-117.8,62.4l22.1-131.5c0.7-4.4-0.7-8.8-3.9-11.9
		l-95.6-92.8l131.9-19.6c4.4-0.7,8.2-3.4,10.1-7.4l58.6-119.7l59.4,119.4c2,4,5.8,6.7,10.2,7.4l132,18.8L349.554,293.911z"
            />
          </g>
        </svg>
      ))}
    </div>
  );
}
