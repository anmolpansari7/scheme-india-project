import Link from "next/link";
import Card from "./Card";
import healthDP from "../../Images/health_display.png";
import educationDP from "../../Images/education_display.png";
import startupDP from "../../Images/startup_display.png";
import styles from "./Categories.module.css";

const Categories = () => {
  return (
    <div className={styles.cards_list}>
      <Link href="/users/health">
        <a>
          <Card image={healthDP} heading={"Health Schemes"} color={"#6dbe66"} />
        </a>
      </Link>
      <Link href="/users/education">
        <a>
          <Card
            image={educationDP}
            heading={"Education Schemes"}
            color={"#fe6666"}
          />
        </a>
      </Link>
      <Link href="/users/startup">
        <a>
          <Card
            image={startupDP}
            heading={"Startup Schemes"}
            color={"#66b6d8"}
          />
        </a>
      </Link>
    </div>
  );
};

export default Categories;
