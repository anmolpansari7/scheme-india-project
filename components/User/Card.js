import Image from "next/image";
import styles from "./Card.module.css";

const Card = (props) => {
  return (
    <div className={styles.card} style={{ backgroundColor: `${props.color}` }}>
      <Image src={props.image} layout="responsive" alt="card image" />
      <div className={styles.card_bottom}>
        <h3>{props.heading}</h3>
      </div>
    </div>
  );
};

export default Card;
