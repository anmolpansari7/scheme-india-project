import { useRouter } from "next/router";
import Image from "next/image";
import NextButton from "./NextButton";
import FrontPic from "./../../Images/bro_sis.png";
import Logo from "./../../Images/Logo.png";
import nextBtn from "./../../Images/nextBtn.svg";

import styles from "./HomePage.module.css";

const HomePage = () => {
  const router = useRouter();

  const nextPageHandler = () => {
    router.push("/users");
  };

  const openAdminPannel = () => {
    router.push("/admin");
  };

  return (
    <main className={styles.home_outer_container}>
      <div className={styles.home_left_content}>
        <Image src={FrontPic} />
      </div>
      <div className={styles.home_right_content}>
        <Image src={Logo} height="100" width="100" />
        <div>
          <h1>Finding Right Scheme is now easy.</h1>
          <p>
            A non- Government Online Platform where you can find all the
            government schemes and among them the right one for you.
          </p>
        </div>
      </div>
      <NextButton onClick={nextPageHandler} image={nextBtn} />
      <button className={styles.admin_btn} onClick={openAdminPannel}>
        Admin
      </button>
    </main>
  );
};

export default HomePage;
