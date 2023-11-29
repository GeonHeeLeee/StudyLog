import Days from './Days.component';
import WeekDay from './WeekDay.component';
import useCalendar from '../../../../hooks/calendar/useCalendar';
import { useScheduleContext } from '../../@contexts/useSchedule';
import { MONTHS } from '../../../../@constants/day';
import styles from './Calendar.module.css';

// const DAYS = ['일', '월', '화', '수', '목', '금', '토'] as const;
// const MONTHS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12] as const;

export default function Calendar() {
  const {
    firstOfMonthDate,
    getCurrentDays,
    handleDecrementMonth,
    handleIncrementMonth,
    isCurrentMonth,
    isFutureMonth,
    // todayDate,
  } = useCalendar();
  const { reset } = useScheduleContext();

  return (
    <section className={styles['calendar-container']}>
      <nav className={styles.nav}>
        <button
          className={styles.button}
          onClick={() => {
            reset();
            handleDecrementMonth();
          }}
        >
          ◀
        </button>
        <strong className={styles.text}>
          {`${firstOfMonthDate.getFullYear()}년 ${
            MONTHS[firstOfMonthDate.getMonth()]
          }월`}
        </strong>
        <button
          className={styles.button}
          onClick={() => {
            reset();
            handleIncrementMonth();
          }}
        >
          ▶
        </button>
      </nav>
      <div className={styles.calendar}>
        <WeekDay />
        <Days
          firstOfMonthDate={firstOfMonthDate}
          getCurrentDays={getCurrentDays}
          isCurrentMonth={isCurrentMonth}
          isFutureMonth={isFutureMonth}
        />
      </div>
    </section>
  );
}
