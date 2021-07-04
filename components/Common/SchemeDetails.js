import { useRouter } from "next/router";
import styles from "./SchemeDetails.module.css";
import NextButton from "./NextButton";
import previousBtn from "./../../Images/previousBtn.svg";
import EligibilityCard from "./EligibilityCard";

const SchemeDetails = (props) => {
  const router = useRouter();
  const previousPageHandler = () => {
    router.back();
  };

  return (
    <div className={styles.scheme_details_page}>
      <NextButton
        image={previousBtn}
        onClick={previousPageHandler}
        type="mobile_bottom_center_button"
      />
      <div className={styles.left_content}>
        <h2>{props.scheme.name}</h2>
        <hr />
        <p>{props.scheme.details}</p>
      </div>
      <div className={styles.right_card}>
        <EligibilityCard
          eligibility={props.scheme.eligibility}
          link={props.scheme.link}
        />
      </div>
    </div>
  );
};

export default SchemeDetails;
