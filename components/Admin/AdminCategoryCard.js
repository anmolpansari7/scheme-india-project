import Image from "next/image";
import styles from "./AdminCategoryCard.module.css";

const AdminCategoryCard = (props) => {
  return (
    <div
      className={styles.admin_card}
      style={{ backgroundColor: `${props.color}` }}
    >
      <Image src={props.image} layout="responsive" />
      <div className={styles.admin_card_bottom}>
        <h3>{props.heading}</h3>
        <div className={styles.numbers_detail}>
          <p>Number of Schemes in our database</p>
          <p className={styles.total_schemes}>{props.totalSchemes}</p>
        </div>
      </div>
    </div>
  );
};

export default AdminCategoryCard;
