import Head from "next/head";
import { useRouter } from "next/router";
import Categories from "./../../components/User/Categories";
import styles from "./../../styles/users.module.css";
import NextButton from "./../../components/Common/NextButton";
import previousBtn from "../../Images/previousBtn.svg";
import nextBtn from "../../Images/nextBtn.svg";

const Users = () => {
  const router = useRouter();

  const previousPageHandler = () => {
    router.back();
  };

  const nextPageHandler = () => {
    router.push("/users/fill-details");
  };

  return (
    <div className={styles.user_page}>
      <Head>
        <title>Scheme India - Scheme Category</title>
        <meta
          name="description"
          content="See all the government schemes in your interested category."
        />
        <meta
          name="keywords"
          content="scheme India, government schemes, government schemes for me, government schemes in India, government scheme, schemes in india, schemes, health schemes in India, education schemes in India, startup shemes in India, health schemes, education schemes, startup schemes, government health schemes India, government education schemes India, government startup shemes India, scholarship schemes."
        />
      </Head>
      <NextButton
        onClick={previousPageHandler}
        image={previousBtn}
        type="mobile_previous_button"
      />
      <div className={styles.user_page_content}>
        <p>We currently have only 3 categories.</p>
        <Categories />
        <p>
          Click anyone of the above card if you want to search by yourself. Or
          Click next arrow and we will try to find the right scheme for you.
        </p>
      </div>
      <NextButton
        onClick={nextPageHandler}
        image={nextBtn}
        type="mobile_next_button"
      />
    </div>
  );
};

export default Users;
