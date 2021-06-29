import { useRouter } from "next/router";
import Head from "next/head";
import NextButton from "./../../../components/Common/NextButton";
import previousBtn from "./../../../Images/previousBtn.svg";
import nextBtn from "./../../../Images/nextBtn.svg";
import styles from "./../../../styles/userFormPage.module.css";
import UserForm from "./../../../components/User/UserForm";

const userFormPage = () => {
  const router = useRouter();
  const previousPageHandler = () => {
    router.back();
  };

  const nextPageHandler = () => {
    // form was submited
  };

  return (
    <div className={styles.user_form_page}>
      <Head>
        <title>Scheme India - Find Scheme for yourself</title>
        <meta
          name="description"
          content="Enter your details and using it we will try to find the best scheme that suits you."
        />
        <meta
          name="keywords"
          content="scheme India, government schemes, find government schemes in india"
        />
      </Head>
      <NextButton onClick={previousPageHandler} image={previousBtn} />
      <UserForm />
      <NextButton onClick={nextPageHandler} image={nextBtn} />
    </div>
  );
};

export default userFormPage;
