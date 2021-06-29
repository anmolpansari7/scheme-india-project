import styles from "./EligibilityCard.module.css";
import Image from "next/image";
import linkBtn from "./../../Images/go_to_link.svg";

const EligibilityCard = (props) => {
  return (
    <div className={styles.eligibility_card}>
      <div>
        <h2>Eligibility</h2>
      </div>
      <div className={styles.eligibility_details}>
        <p>{props.eligibility}</p>
      </div>
      <div className={styles.eligibility_links}>
        <p>Go to Official Site</p>
        <a target="_blank" href={props.link} rel="noopener noreferrer">
          <Image src={linkBtn} alt="outgoing additional link button" />
        </a>
      </div>
    </div>
  );
};

export default EligibilityCard;
