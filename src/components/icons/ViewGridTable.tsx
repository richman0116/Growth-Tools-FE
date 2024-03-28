import { SVGProps } from "react";

export const ViewGridTable = ({ fill = "black" }: SVGProps<any>) => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M4.25 3.5C3.01625 3.5 2 4.51625 2 5.75V18.25C2 19.4838 3.01625 20.5 4.25 20.5H19.75C20.9838 20.5 22 19.4838 22 18.25V5.75C22 4.51625 20.9838 3.5 19.75 3.5H4.25ZM4.25 5H8V11.25H3.5V5.75C3.5 5.32675 3.82675 5 4.25 5ZM9.5 5H14.5V11.25H9.5V5ZM16 5H19.75C20.1733 5 20.5 5.32675 20.5 5.75V11.25H16V5ZM3.5 12.75H8V19H4.25C3.82675 19 3.5 18.6732 3.5 18.25V12.75ZM9.5 12.75H14.5V19H9.5V12.75ZM16 12.75H20.5V18.25C20.5 18.6732 20.1733 19 19.75 19H16V12.75Z"
        fill="black"
      />
      <path
        d="M4.25 3.5C3.01625 3.5 2 4.51625 2 5.75V18.25C2 19.4838 3.01625 20.5 4.25 20.5H19.75C20.9838 20.5 22 19.4838 22 18.25V5.75C22 4.51625 20.9838 3.5 19.75 3.5H4.25ZM4.25 5H8V11.25H3.5V5.75C3.5 5.32675 3.82675 5 4.25 5ZM9.5 5H14.5V11.25H9.5V5ZM16 5H19.75C20.1733 5 20.5 5.32675 20.5 5.75V11.25H16V5ZM3.5 12.75H8V19H4.25C3.82675 19 3.5 18.6732 3.5 18.25V12.75ZM9.5 12.75H14.5V19H9.5V12.75ZM16 12.75H20.5V18.25C20.5 18.6732 20.1733 19 19.75 19H16V12.75Z"
        fill="url(#paint0_linear_3588_615)"
      />
      <defs>
        <linearGradient
          id="paint0_linear_3588_615"
          x1="-0.630207"
          y1="3.49997"
          x2="45.2326"
          y2="6.55958"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor={fill} />
          <stop offset="1" stopColor={fill} />
        </linearGradient>
      </defs>
    </svg>
  );
};
