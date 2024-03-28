import { SVGProps } from "react";

export const ViewGridList = ({ fill = "black" }: SVGProps<any>) => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g opacity="0.3">
        <path
          d="M6.25 3C4.46403 3 3 4.46403 3 6.25V17.75C3 19.536 4.46403 21 6.25 21H17.75C19.536 21 21 19.536 21 17.75V6.25C21 4.46403 19.536 3 17.75 3H6.25ZM6.25 4.5H7V7.5H4.5V6.25C4.5 5.27497 5.27497 4.5 6.25 4.5ZM8.5 4.5H17.75C18.725 4.5 19.5 5.27497 19.5 6.25V7.5H8.5V4.5ZM4.5 9H7V11.5H4.5V9ZM8.5 9H19.5V11.5H8.5V9ZM4.5 13H7V15.5H4.5V13ZM8.5 13H19.5V15.5H8.5V13ZM4.5 17H7V19.5H6.25C5.27497 19.5 4.5 18.725 4.5 17.75V17ZM8.5 17H19.5V17.75C19.5 18.725 18.725 19.5 17.75 19.5H8.5V17Z"
          fill={fill}
        />
      </g>
    </svg>
  );
};
