import styles from "@/styles/page.module.scss";
import classNames from "classnames";

export default function Home() {
  return (
    <div className={styles.main}>
      <div className={styles.head}>
        Welcome to
        <div className={styles.title}>EMBRACE THE UNKNOWN</div>
      </div>
      <div className={styles.rules}>
        <div className={styles.title}>Rules:</div>
        <ul>
          ✦ Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore ratione dignissimos
          illum corporis quibusdam itaque odit ipsam. Quaerat similique earum asperiores beatae
          eveniet, consequuntur quia. <br />
          ✦ Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab, voluptatem! <br />
          ✦ Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ducimus, blanditiis. Molestias
          veniam perspiciatis quod cumque fuga ab tenetur laboriosam quibusdam! <br />
          ✦ Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus, error! <br />
          ✦ Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus, error! <br />
          ✦ Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus, error! <br />
        </ul>
      </div>
      <div className={styles.room}>
        <div className={classNames(styles.create, styles.button)}>Create a room</div>
        <div className={classNames(styles.join, styles.button)}>Join a room</div>
      </div>
    </div>
  );
}
