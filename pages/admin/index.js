import { useRef, useState } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import Images from "next/image";
import LoginIllustration from "./../../Images/login_illustration.png";

import styles from "./../../styles/loginPage.module.css";

const Admin = () => {
  const [heading, setHeading] = useState("LogIn");
  const inputUsernameRef = useRef();
  const inputPasswordRef = useRef();

  const router = useRouter();

  const loginFormSubmissionHandler = async (e) => {
    e.preventDefault();

    const response = await fetch("/api/admin-login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        adminName: inputUsernameRef.current.value,
        adminPassword: inputPasswordRef.current.value,
      }),
    });

    const status = await response.status;
    if (status === 200) {
      router.push("/admin/admin-category");
    } else {
      setHeading("Wrong Credentials!");
    }
    console.log(status);
    const json = await response.json();

    console.log(json);
  };

  return (
    <div className={styles.wrapper}>
      <Head>
        <title>Scheme India - Admin Login</title>
      </Head>
      <div className={styles.login_container}>
        <div className={styles.login_head}>
          <Images src={LoginIllustration} alt="login illustration" />
          <h2>{heading}</h2>
        </div>
        <form onSubmit={loginFormSubmissionHandler}>
          <div>
            <label htmlFor="id">UserId</label>
            <input ref={inputUsernameRef} id="id" type="text" required />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input
              ref={inputPasswordRef}
              id="password"
              type="password"
              required
            />
          </div>
          <button type="submit">Log In</button>
        </form>
      </div>
    </div>
  );
};

export default Admin;
