import Image from "next/image";
import styles from "./NextButton.module.css";

const NextButton = (props) => {
  return (
    <button
      className={`${styles.next_button} ${styles.highlight_btn}`}
      onClick={props.onClick}
    >
      <Image src={props.image} />
    </button>
  );
};

export default NextButton;
