import styles from './Day.module.css';

type Props = {
  day: number | string;
  isCurrentMonth: boolean;
  isFutureMonth: boolean;
};

export default function Day({ day, isCurrentMonth, isFutureMonth }: Props) {
  const isBlank = day === '';
  const isCurrentDay = day === new Date().getDate() && isCurrentMonth;
  const isFutureDay =
    parseInt(`${day}`) > new Date().getDate() && isFutureMonth;
  return (
    <div
      className={`${styles.container} ${isBlank && styles.blank}`}
    >
      <p className={`${isCurrentDay && styles.current} ${styles.day}`}>{day}</p>
    </div>
  );
}
