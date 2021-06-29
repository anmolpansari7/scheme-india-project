import "../styles/globals.css";
import BackgroundBlur from "../components/Layout/BackgroundBlur";
import Router from "next/router";
import NProgress from "nprogress";

function MyApp({ Component, pageProps }) {
  Router.events.on("routeChangeStart", () => {
    NProgress.start();
  });

  Router.events.on("routeChangeComplete", () => {
    NProgress.done();
  });

  Router.events.on("routeChangeError", () => {
    NProgress.done();
  });

  return (
    <BackgroundBlur>
      <Component {...pageProps} />
    </BackgroundBlur>
  );
}

export default MyApp;
