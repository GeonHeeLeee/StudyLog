import React from 'react';
import { CurrentDays } from '../../hooks/calendar/useCalendar';
import Day from './Day.component';

import styles from './Days.module.css';

type Props = {
  getCurrentDays: () => CurrentDays;
  isCurrentMonth: () => boolean;
  isFutureMonth: () => boolean;
};

export default function Days({
  getCurrentDays,
  isCurrentMonth,
  isFutureMonth,
}: Props) {
  return (
    <section className={styles['days-container']}>
      <div className={styles.days}>
        {getCurrentDays().map((day, idx) => (
          <Day
            key={idx}
            day={day}
            isCurrentMonth={isCurrentMonth()}
            isFutureMonth={isFutureMonth()}
          />
        ))}
      </div>
    </section>
  );
}
