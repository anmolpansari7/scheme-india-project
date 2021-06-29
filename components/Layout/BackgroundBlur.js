import styles from "./BackgroundBlur.module.css";

const BackgroundBlur = (props) => {
  return <div className={styles.blur}>{props.children}</div>;
};

export default BackgroundBlur;
