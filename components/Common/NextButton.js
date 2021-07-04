import Image from "next/image";
import styles from "./NextButton.module.css";

const NextButton = (props) => {
  return (
    <button
      className={`${styles.next_button} ${styles.highlight_btn} ${props.type}`}
      onClick={props.onClick}
    >
      <Image src={props.image} alt="previous and next button" />
    </button>
  );
};

export default NextButton;
