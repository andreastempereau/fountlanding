export const FileIcon = ({
  color = "currentColor",
  size = "16",
  className = "",
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="none"
      stroke={color}
      xmlns="http://www.w3.org/2000/svg"
      className={`${className}`}
    >
      <path
        d="M3 5H11"
        stroke={color}
        stroke-width="1.2"
        stroke-linecap="round"
      />
      <path
        d="M3 8H13"
        stroke={color}
        stroke-width="1.2"
        stroke-linecap="round"
      />
      <path
        d="M3 11H9"
        stroke={color}
        stroke-width="1.2"
        stroke-linecap="round"
      />
    </svg>
  );
};
