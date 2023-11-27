import 'react-calendar-heatmap/dist/styles.css';
import 'react-tooltip/dist/react-tooltip.css';
import styles from './StudyLog.module.css';

import CalendarHeatmap from 'react-calendar-heatmap';
import { Tooltip as ReactTooltip } from 'react-tooltip';

const today = new Date();

type StudyLog = {
  date: string;
  count: number;
};

export default function StudyLog() {
  const studyLogs = [
    { date: '2023-01-01', count: 1 },
    { date: '2023-01-02', count: 2 },
    { date: '2023-01-03', count: 3 },
    { date: '2023-01-04', count: 1 },
    { date: '2023-01-05', count: 1 },
    { date: '2023-11-19', count: 0 },
    { date: '2023-11-20', count: 1 },
    { date: '2023-11-21', count: 2 },
    { date: '2023-11-22', count: 1 },
    { date: '2023-11-23', count: 3 },
    { date: '2023-11-24', count: 2 },
    { date: '2023-11-25', count: 1 },
    { date: '2023-11-26', count: 2 },
    { date: '2023-11-27', count: 1 },
    { date: '2023-11-28', count: 2 },
    // ...
  ];

  // Tooltip 띄우기 위해 존재하지 않는 날짜 데이터 생성
  const completeStudyLogs = generateYearData(new Date(), studyLogs);
  console.log(completeStudyLogs);

  return (
    <div className={styles['studylog-container']}>
      <h1>StudyLog</h1>

      <div className={styles['studylog']}>
        <CalendarHeatmap
          startDate={shiftDate(today, -365)}
          endDate={today}
          values={completeStudyLogs}
          classForValue={(value: StudyLog) => {
            if (!value) return 'color-empty';
            return `color-github-${value.count}`;
          }}
          tooltipDataAttrs={(value: StudyLog) => {
            return {
              'data-tooltip-id': 'heatmap-tooltip',
              'data-tooltip-content': `${value.date}`,
            };
          }}
        />
        <ReactTooltip id='heatmap-tooltip' />
      </div>
    </div>
  );
}

function shiftDate(date: Date, numDays: number) {
  const newDate = new Date(date);
  newDate.setDate(newDate.getDate() + numDays);
  console.log(newDate);

  return newDate;
}

const generateYearData = (baseDate: Date, logs: StudyLog[]) => {
  let data: StudyLog[] = [];
  for (let i = 0; i < 365; i++) {
    const date = shiftDate(baseDate, -i);
    const dateString = date.toISOString().split('T')[0]; // 날짜를 'yyyy-mm-dd' 형식의 문자열로 변환

    const log = logs.find((log) => log.date === dateString);

    data.push({
      date: dateString,
      count: log ? log.count : 0,
    });
  }
  return data;
};
