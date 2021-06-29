import { useRouter } from "next/router";
import Head from "next/head";
import Images from "next/image";
import LoginIllustration from "./../../Images/login_illustration.png";

import styles from "./../../styles/loginPage.module.css";

const Admin = () => {
  const router = useRouter();

  const loginFormSubmissionHandler = (e) => {
    e.preventDefault();
    router.push("/admin/admin-category");
  };

  return (
    <div className={styles.wrapper}>
      <Head>
        <title>Scheme India - Admin Login</title>
      </Head>
      <div className={styles.login_container}>
        <div className={styles.login_head}>
          <Images src={LoginIllustration} alt="login illustration" />
          <h2>Log In</h2>
        </div>
        <form onSubmit={loginFormSubmissionHandler}>
          <div>
            <label htmlFor="id">UserId</label>
            <input id="id" type="text" />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input type="password" />
          </div>
          <button type="submit">Log In</button>
        </form>
      </div>
    </div>
  );
};

export default Admin;
