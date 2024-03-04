import { useMemo } from 'react';

export interface LogoProps extends React.SVGProps<SVGSVGElement> {
  color?: 'pink' | 'black' | 'white';
}

export const Logo: React.FC<LogoProps> = ({ color = 'pink', ...props }) => {
  const logoColor = useMemo(() => {
    switch (color) {
      case 'black':
        return 'fill-black';
      case 'white':
        return 'fill-white';
      case 'pink':
        default:
        return 'fill-pink-700';
    }
  }, [color])
  
  return (
    <svg
      viewBox="0 0 112 25"
      xmlns="http://www.w3.org/2000/svg"
      className={logoColor}
      {...props}
    >
      <g clipPath="url(#clip0_5128_9601)">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M7.43165 9.01623C6.1834 12.0049 7.17432 16.5865 10.9959 16.5865C15.3423 16.5865 16.2764 12.4691 16.2797 12.4457L20.0061 12.4558C20.0061 12.5643 19.7955 15.5096 17.3074 19.4316C14.8192 23.3537 11.9167 25 7.77087 25C0.836144 25 -2.41399 17.3529 2.05097 8.9244C5.09056 3.18239 10.0267 0 14.6672 0C21.8174 0 21.2226 7.55193 20.6862 9.07467H16.7827C16.7894 9.06799 17.4427 4.36619 13.4323 4.36619C10.8138 4.36619 8.65484 6.08929 7.43165 9.01623ZM50.9911 9.44867C50.9911 8.78748 50.7003 7.83577 49.5824 7.83577C48.4595 7.83577 48.0802 8.88098 48.0718 9.50878C48.0718 10.8546 48.8698 11.6632 49.7766 12.5823C50.9704 13.7922 52.353 15.1934 52.353 18.2629C52.353 20.0327 51.1565 23.2719 46.5429 23.2719C43.3495 23.2719 41.2808 21.7859 40.5539 19.6554C39.3508 21.8977 37.6948 23.2084 35.3738 23.2084C31.7025 23.2084 31.2998 19.0877 31.3366 18.8372C31.228 19.2213 30.09 23.2084 25.1538 23.2084C21.4291 23.2084 18.7321 18.7471 21.8753 12.1786C22.9681 9.89447 25.8991 5.05242 30.872 5.05242C34.712 5.05242 35.3888 7.26808 35.469 8.07286C35.8968 7.56027 36.1859 6.21452 35.5626 5.1142H41.6651C41.341 5.98744 39.4761 10.746 38.8495 12.3322C38.8118 12.4272 38.7721 12.5266 38.7309 12.6293C38.1001 14.205 37.1486 16.5815 38.6389 16.5815C39.5337 16.5815 39.8606 15.4931 40.1032 14.6855L40.1032 14.6854L40.1033 14.6854C40.152 14.5232 40.1973 14.3724 40.2431 14.244C40.3984 13.6854 40.6072 13.143 40.8664 12.6244H42.9752C42.9752 14.1922 43.1123 16.6049 44.9253 16.6082C45.963 16.6082 46.456 15.5981 45.4533 13.9084C44.4073 12.1469 43.5684 10.3353 43.8909 8.12629C44.282 5.47485 46.5696 4.34114 49.4621 4.34114C52.9713 4.34114 54.4334 6.47832 54.4401 8.5771C54.4401 9.55386 53.892 10.7844 53.4609 11.2853H50.3227C50.6135 11.0098 50.9911 10.1449 50.9911 9.44867ZM29.2294 16.5798C30.9656 16.5798 32.6266 15.4211 33.6292 13.3791C34.9844 10.6275 33.7545 8.66226 31.8563 8.66226C29.8059 8.66226 28.1784 9.99632 27.1891 11.878C25.9843 14.1672 26.8014 16.5798 29.2294 16.5798ZM107.279 16.5865C105.907 16.5865 106.721 14.6611 107.371 13.1239L107.371 13.1236C107.491 12.8401 107.605 12.5698 107.699 12.3272C108.347 10.6458 110.113 5.98244 110.438 5.11755H104.337C104.96 6.21786 104.671 7.56529 104.241 8.07788C104.163 7.27309 103.484 5.05744 99.6461 5.05744C94.6732 5.05744 91.7405 9.89949 90.6477 12.1819C87.5045 18.7538 89.9308 23.2084 93.9262 23.2084C98.8624 23.2084 100.047 19.1061 100.109 18.8372C100.022 19.3148 100.625 23.2084 104.748 23.2084C111.611 23.2084 111.993 13.2071 111.993 13.2071L109.385 13.1904L109.375 13.2265C109.128 14.1324 108.458 16.5865 107.279 16.5865ZM102.402 13.3858C101.399 15.4294 99.7397 16.5865 98.0019 16.5865C95.5755 16.5865 94.7567 14.1739 95.9615 11.8847C96.9525 10.0047 98.5784 8.66894 100.629 8.66894C102.522 8.66894 103.759 10.6341 102.402 13.3858ZM85.4576 11.2152C86.9214 8.03947 87.9841 5.61344 88.1997 5.11254L92.9353 5.11087C92.9147 5.15297 92.8773 5.2309 92.8207 5.34882C92.4597 6.10084 91.3181 8.4793 88.7728 13.5628C85.618 19.8641 83.7514 23.2201 78.5462 23.2201C75.8475 23.2201 73.7387 20.8843 73.5532 18.9541C73.1405 21.083 71.2322 23.2085 68.9629 23.2085C64.8355 23.2085 64.3543 19.3164 64.4328 18.8372C64.4267 18.8546 64.419 18.8779 64.4095 18.9064C64.1868 19.5792 62.9853 23.2085 58.25 23.2085C54.2546 23.2085 51.8283 18.7538 54.9715 12.1819C56.0643 9.89949 58.997 5.05744 63.9699 5.05744C67.8083 5.05744 68.4867 7.27309 68.5652 8.07788C68.9947 7.56529 69.2838 6.21786 68.6605 5.11755H74.7597C74.4355 5.98745 72.6676 10.6625 72.0192 12.3322C71.9485 12.5134 71.8729 12.7011 71.796 12.892C71.1059 14.6052 70.3078 16.5865 71.939 16.5865C72.3568 16.5865 72.8363 16.4713 73.0118 15.4829C73.2061 14.3926 73.7805 13.0308 74.0836 12.3122C74.1533 12.1471 74.2086 12.0159 74.2417 11.9298L74.6035 10.981C75.3124 9.12165 76.7795 5.27406 76.8418 5.11254H82.8742C82.7778 5.35807 82.6678 5.64722 82.5346 5.99719C82.1389 7.03703 81.539 8.61377 80.4863 11.1785C79.1795 14.3709 78.8554 16.5865 80.9876 16.5865C82.7839 16.5865 84.1057 14.1438 85.4576 11.2152ZM62.3256 16.5865C64.0635 16.5865 65.7228 15.4294 66.7254 13.3858C68.0823 10.6341 66.8407 8.66894 64.9525 8.66894C62.9021 8.66894 61.2762 10.0047 60.2853 11.8847C59.0805 14.1739 59.8993 16.5865 62.3256 16.5865Z"
        />
      </g>
      <defs>
        <clipPath id="clip0_5128_9601">
          <rect width="112" height="25" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};