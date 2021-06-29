import Head from "next/head";
import HomePage from "./../components/Common/HomePage";

export default function Home() {
  return (
    <>
      <Head>
        <title>Scheme India</title>
        <meta
          name="description"
          content="Easy way to find the right government scheme for you."
        />
        <meta
          name="keywords"
          content="scheme India, government schemes, government schemes for me, government schemes in India, government scheme, schemes in india, schemes, health schemes in India, education schemes in India, startup shemes in India, health schemes, education schemes, startup schemes, government health schemes India, government education schemes India, government startup shemes India, scholarship schemes."
        />
      </Head>
      <HomePage />
    </>
  );
}
