import "../styles/globals.css";
import BackgroundBlur from "../components/Layout/BackgroundBlur";
import Router from "next/router";
import NProgress from "nprogress";

function MyApp({ Component, pageProps }) {
  Router.events.on("routeChangeStart", (url) => {
    console.log("Route is Changing.");
    NProgress.start();
  });

  Router.events.on("routeChangeComplete", (url) => {
    console.log("Route is Changing is Complete.");
    NProgress.done();
  });

  Router.events.on("routeChangeError", (url) => {
    console.log("There was an error");
    NProgress.done();
  });

  return (
    <BackgroundBlur>
      <Component {...pageProps} />
    </BackgroundBlur>
  );
}

export default MyApp;
