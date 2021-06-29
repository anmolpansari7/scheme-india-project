import { useState } from "react";
import { useRouter } from "next/router";
import styles from "./UserForm.module.css";
import CircleCard from "./CircleCard";
import healthCircle from "./../../Images/health_circle_card.png";
import educationCircle from "./../../Images/education_circle_card.png";
import startupCircle from "./../../Images/startup_circle_card.png";
import statesCitiesArray from "./../../public/citylist";
import StateCityOptions from "./StateCityOptions";

const UserForm = () => {
  const router = useRouter();

  const [choosenStateIndex, setChoosenStateIndex] = useState(18);
  const [name, setName] = useState("");
  const [age, setAge] = useState(1);
  const [gender, setGender] = useState("male");
  const [category, setCategory] = useState("GEN");
  const [state, setState] = useState("Madhya Pradesh");
  const [city, setCity] = useState("Bhopal");
  const [scheme, setScheme] = useState("");

  const stateChangeHandler = (e) => {
    setState(e.target.value);
    const i = statesCitiesArray.findIndex(
      (obj) => obj.state === e.target.value
    );
    setChoosenStateIndex(i);
  };

  const submitUserFormHandler = (e) => {
    e.preventDefault();
    const userDetails = {
      name: name,
      age: age,
      gender: gender,
      category: category,
      state: state,
      city: city,
      scheme: scheme,
    };
    router.push("/users/fill-details/found-schemes");
  };

  return (
    <div className={styles.form_content}>
      <form onSubmit={submitUserFormHandler}>
        <div className={styles.user_form_left}>
          <div className={styles.field}>
            <label htmlFor="name">Name</label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
              autoComplete="off"
              required
            />
          </div>
          <div className={styles.field}>
            <label htmlFor="age">Age</label>
            <input
              id="age"
              type="number"
              min="1"
              max="100"
              onChange={(e) => setAge(e.target.value)}
              autoComplete="off"
              required
            />
          </div>
          <div className={`${styles.field} ${styles.selection}`}>
            <div className={styles.selection_div}>
              <label htmlFor="gender">Gender</label>
              <select
                id="gender"
                name="gender"
                onChange={(e) => setGender(e.target.value)}
              >
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div className={styles.selection_div}>
              <label htmlFor="category">Category</label>
              <select
                id="category"
                name="category"
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="GEN">GEN</option>
                <option value="OBC">OBC</option>
                <option value="ST/SC">ST/SC</option>
              </select>
            </div>
          </div>
          <div className={styles.field}>
            <label htmlFor="state">State</label>
            <select
              id="state"
              name="state"
              value={state}
              onChange={stateChangeHandler}
              autoComplete="off"
            >
              {statesCitiesArray.map((obj, index) => {
                return (
                  <StateCityOptions
                    key={index}
                    value={obj.state}
                    name={obj.state}
                  />
                );
              })}
            </select>
          </div>
          <div className={styles.field}>
            <label htmlFor="city">City</label>
            <select
              id="city"
              name="city"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              autoComplete="off"
            >
              {statesCitiesArray[choosenStateIndex].cities.map((obj, index) => {
                return <StateCityOptions value={obj} name={obj} key={index} />;
              })}
            </select>
          </div>
        </div>
        <div className={styles.user_form_right}>
          <p>Choose any one card of your interested category.</p>
          <div
            className={styles.scheme_category_circle_cards}
            onChange={(e) => setScheme(e.target.value)}
          >
            <div>
              <input
                type="radio"
                id="health_radio"
                name="scheme_type"
                value="health"
                required
              />
              <label htmlFor="health_radio">
                <CircleCard image={healthCircle} />
              </label>
            </div>
            <div>
              <input
                type="radio"
                id="eduacation_radio"
                name="scheme_type"
                value="education"
              />
              <label htmlFor="eduacation_radio">
                <CircleCard image={educationCircle} />
              </label>
            </div>
            <div>
              <input
                type="radio"
                id="startup_radio"
                name="scheme_type"
                value="startup"
              />
              <label htmlFor="startup_radio">
                <CircleCard image={startupCircle} />
              </label>
            </div>
          </div>
          <p>
            This information is not shared with anyone. This is just to find a
            perfect scheme for you according to your entered details. So, Please
            enter the <strong>Correct details</strong>.
          </p>
        </div>
        <button type="submit"> </button>
      </form>
    </div>
  );
};

export default UserForm;
