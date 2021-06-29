import Image from "next/image";
import styles from "./CircleCard.module.css";

const CircleCard = (props) => {
  return (
    <div className={styles.circle_container}>
      <Image src={props.image} alt="scheme type image" />
    </div>
  );
};

export default CircleCard;
