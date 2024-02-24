export const IconPlus = (props: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg
      {...props}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12 3C12.4971 3 12.9 3.40293 12.9 3.89996L12.9 11.1L20.1 11.1C20.5971 11.1 21 11.503 21 12C21 12.497 20.5971 12.9 20.1 12.9L12.9 12.899L12.9 20.1001C12.9 20.5972 12.4971 21.0001 12 21.0001C11.503 21.0001 11.1001 20.5972 11.1001 20.1001L11.1 12.899L3.89995 12.9C3.40292 12.9 3 12.497 3 12C3 11.503 3.40292 11.1 3.89995 11.1L11.1 11.1L11.1001 3.89996C11.1001 3.40293 11.503 3 12 3Z"
        fill="currentColor"
      />
    </svg>
  );
};

export const IconPlusCircle = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 24 26"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M12 10V18M8 14H16M22 14C22 19.5228 17.5228 24 12 24C6.47715 24 2 19.5228 2 14C2 8.47715 6.47715 4 12 4C17.5228 4 22 8.47715 22 14Z"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const IconMinusCircle = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 24 26"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M8 14H16M22 14C22 19.5228 17.5228 24 12 24C6.47715 24 2 19.5228 2 14C2 8.47715 6.47715 4 12 4C17.5228 4 22 8.47715 22 14Z"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
