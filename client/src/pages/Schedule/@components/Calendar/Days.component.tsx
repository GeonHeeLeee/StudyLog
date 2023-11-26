import React from 'react';

import Day from './Day.component';
import { CurrentDays } from '../../../../hooks/calendar/useCalendar';
import styles from './Days.module.css';

type Props = {
  getCurrentDays: () => CurrentDays;
  isCurrentMonth: () => boolean;
  isFutureMonth: () => boolean;
  firstOfMonthDate: Date;
};

export default function Days({
  getCurrentDays,
  isCurrentMonth,
  isFutureMonth,
  firstOfMonthDate
}: Props) {
  return (
    <section className={styles['days-container']}>
      <div className={styles.days}>
        {getCurrentDays().map((day, idx) => (
          <Day
            key={idx}
            day={day}
            firstOfMonthDate={firstOfMonthDate}
            isCurrentMonth={isCurrentMonth()}
            isFutureMonth={isFutureMonth()}
          />
        ))}
      </div>
    </section>
  );
}
