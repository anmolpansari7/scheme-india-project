import styles from "./SchemeCard.module.css";

const SchemeCard = (props) => {
  return (
    <div className={styles.scheme_card}>
      <h2>{props.scheme.name}</h2>
      <p>Type - {props.scheme.type}</p>
    </div>
  );
};

export default SchemeCard;
