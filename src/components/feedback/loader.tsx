import { Paragraph } from '..';

export const SmallLoader: React.FC = () => {
  return (
    <div className="bg-white flex flex-col items-center gap-3 p-6">
      <div className="inline-block animate-spin">
        <svg
          width="50"
          height="50"
          viewBox="0 0 50 50"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g clipPath="url(#clip0_7_358)">
            <path
              d="M41.8336 9.32738C45.9902 13.7919 48.2031 19.7248 47.9853 25.8209C47.7676 31.917 45.1372 37.6769 40.6726 41.8336C36.2081 45.9902 30.2752 48.2031 24.1791 47.9853C18.083 47.7676 12.3231 45.1372 8.16644 40.6726C4.0098 36.2081 1.79694 30.2752 2.01465 24.1791C2.23237 18.083 4.86283 12.3231 9.32737 8.16644C13.7919 4.0098 19.7248 1.79694 25.8209 2.01465C31.917 2.23237 37.6769 4.86283 41.8336 9.32737L41.8336 9.32738Z"
              stroke="#FFE8F2"
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M25 2C28.0204 2 31.0112 2.59491 33.8017 3.75077C36.5922 4.90663 39.1277 6.6008 41.2635 8.73654C43.3992 10.8723 45.0934 13.4078 46.2492 16.1983C47.4051 18.9888 48 21.9796 48 25"
              stroke="#FF147D"
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </g>
          <defs>
            <clipPath id="clip0_7_358">
              <rect width="50" height="50" rx="25" fill="white" />
            </clipPath>
          </defs>
        </svg>
      </div>
      <Paragraph className="text-center">Loading...</Paragraph>
    </div>
  );
};
