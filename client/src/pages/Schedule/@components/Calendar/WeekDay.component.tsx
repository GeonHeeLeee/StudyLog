import { DAYS } from '../../../../@constants/day';
import styles from './WeekDay.module.css';

export default function WeekDay() {
  return (
    <section className={styles['week-container']}>
      <div className={styles['week-header']}>
        {DAYS.map((day) => (
          <div key={day} className={styles.block}>
            {day}
          </div>
        ))}
      </div>
    </section>
  );
}
