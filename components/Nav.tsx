import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import Github from "../public/github.svg";
import Info from "../public/info.svg";
import Logo from "../public/logo.svg";
import styles from "./Nav.module.css";

const LINKS = [
  { path: "/", text: "Hotspot Map" },
  { path: "/stats", text: "Network Stats" },
];

export const Nav = () => {
  const router = useRouter();

  return (
    <div className={styles.wrapper}>
      <div className={styles.leftWrapper}>
        <div className={styles.logoWrapper}>
          <Image src={Logo} alt="Helium Logo" />
        </div>
        <div className={styles.navLinksWrapper}>
          {LINKS.map(({ path, text }) => {
            const style =
              router.route === path ? styles.navLinkActive : styles.navLink;
            return (
              <Link href={path} key={path} className={style}>
                {text}
              </Link>
            );
          })}
        </div>
      </div>
      {router.route === "/" && (
        <div className={styles.searchWrapper}>
          <input
            className={styles.searchInput}
            type="text"
            placeholder="Search..."
          />
        </div>
      )}
      <div className={styles.infoWrapper}>
        <Image src={Info} alt="Info" />
        <a href="https://github.com/helium/network-explorer" target="_blank">
          <Image src={Github} alt="Helium Logo" />
        </a>
      </div>
    </div>
  );
};
