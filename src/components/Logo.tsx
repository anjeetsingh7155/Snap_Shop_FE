import { SvgXml } from "react-native-svg";

// this is the SVG code of the Snap Shop logo
const logoXml = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 1200" width="1200" height="1200">
<defs>
<linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
<stop offset="0%" stop-color="#14B8A6" />
<stop offset="48%" stop-color="#0D9488" />
<stop offset="100%" stop-color="#065F5B" />
</linearGradient>
<linearGradient id="bgGlow" x1="0" y1="0" x2="1" y2="1">
<stop offset="0%" stop-color="#2DD4BF" />
<stop offset="100%" stop-color="#0D9488" stop-opacity="0" />
</linearGradient>
<linearGradient id="bag" x1="0" y1="0" x2="1" y2="1">
<stop offset="0%" stop-color="#FFFFFF" />
<stop offset="75%" stop-color="#F8FFFE" />
<stop offset="100%" stop-color="#CCFBF1" />
</linearGradient>
<linearGradient id="bagShadow" x1="0" y1="0" x2="1" y2="1">
<stop offset="0%" stop-color="#0D9488" stop-opacity=".65" />
<stop offset="100%" stop-color="#134E4A" stop-opacity=".1" />
</linearGradient>
<filter id="shadow" x="-30%" y="-30%" width="160%" height="160%">
<feDropShadow dx="0" dy="18" stdDeviation="18" flood-opacity=".28" />
</filter>
<filter id="softGlow" x="-30%" y="-30%" width="160%" height="160%">
<feGaussianBlur stdDeviation="18" />
</filter>
<clipPath id="iconClip">
<rect x="55" y="55" width="1090" height="1090" rx="205" />
</clipPath>
</defs>
<g filter="url(#shadow)">
<rect x="55" y="55" width="1090" height="1090" rx="205" fill="url(#bg)" />
<g clip-path="url(#iconClip)">
<path d="M-80 640 C80 220 450 10 820 35 C510 155 235 355 95 760 C35 935 10 1080 0 1200 L-80 1200Z" fill="url(#bgGlow)" />
<path d="M1200 510 C1000 790 820 930 505 1070 C730 1010 1020 890 1200 680Z" fill="#0F766E" opacity=".34" />
<ellipse cx="600" cy="370" rx="360" ry="250" fill="#2DD4BF" opacity=".12" filter="url(#softGlow)" />
<g fill="#FFFFFF" filter="url(#shadow)">
<rect x="315" y="452" width="155" height="45" rx="22" />
<rect x="245" y="530" width="125" height="45" rx="22" />
<rect x="310" y="615" width="210" height="48" rx="24" />
</g>
<path d="M420 450 Q430 400 480 390 L835 390 Q890 390 905 445 L960 790 Q970 850 910 870 L475 870 Q405 870 390 805 L365 520 Q360 475 420 450Z" fill="url(#bagShadow)" opacity=".75" />
<path d="M535 420 V325 C535 235 585 190 655 190 C725 190 775 235 775 325 V420" fill="none" stroke="#FFFFFF" stroke-width="38" stroke-linecap="round" filter="url(#shadow)" />
<path d="M475 365 Q480 335 515 335 L820 335 Q860 335 868 375 L920 765 Q928 825 870 835 L500 835 Q445 835 438 780 L415 410 Q410 365 475 365Z" fill="url(#bag)" filter="url(#shadow)" />
<path d="M535 430 C590 405 675 410 755 440 C825 466 850 510 842 555 C833 605 780 620 715 610 L615 592 C565 583 535 600 535 628 C535 661 580 680 650 698 L760 725 C825 741 865 773 858 805 C852 833 822 846 780 850 C700 857 610 836 545 810 L570 755 C635 780 705 792 758 785 C786 781 795 768 780 757 C766 746 735 738 695 728 L595 703 C515 683 470 645 475 595 C480 545 530 515 600 520 L720 535 C757 540 775 530 772 510 C768 488 728 475 680 462 L560 435Z" fill="#FFFFFF" />
<path d="M735 456 C790 474 820 497 822 528 C824 550 808 566 780 570 C790 548 780 530 748 516 C720 504 695 497 666 489Z" fill="#CCFBF1" opacity=".85" />
</g>
<rect x="55" y="55" width="1090" height="1090" rx="205" fill="none" stroke="#5EEAD4" stroke-opacity=".35" stroke-width="4" />
</g>
</svg>`;

// the blur and shadow effects are removed because phones may not draw them properly
// (delete these three lines if you want to try the effects)
const simpleLogoXml = logoXml
  .replace(/<ellipse[^>]*\/>/, "")
  .replace(/ filter="[^"]*"/g, "")
  .replace(/<filter[\s\S]*?<\/filter>/g, "");

type Props = {
  size?: number;
};

export default function Logo({ size = 120 }: Props) {
  return <SvgXml xml={simpleLogoXml} width={size} height={size} />;
}
