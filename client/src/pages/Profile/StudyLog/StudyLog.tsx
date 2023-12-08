import 'react-calendar-heatmap/dist/styles.css';
import 'react-tooltip/dist/react-tooltip.css';
import styles from './StudyLog.module.css';

import { Timers } from '../profile.type';

import CalendarHeatmap from 'react-calendar-heatmap';
import { Tooltip as ReactTooltip } from 'react-tooltip';

const today = new Date();

type StudyLog = {
  date: string;
  count: number;
  studyTime: string;
};

export default function StudyLog(props: { timers: Timers[] }) {
  const { timers } = props;

  // Tooltip 띄우기 위해 존재하지 않는 날짜 데이터 생성
  const completeStudyLogs = generateYearData(new Date(), timers);

  console.log(timers);

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
              'data-tooltip-content': `${value.date}
              공부시간: ${value.studyTime}`,
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

  return newDate;
}

const generateYearData = (baseDate: Date, logs: Timers[]) => {
  let data: StudyLog[] = [];
  for (let i = 0; i < 365; i++) {
    const date = shiftDate(baseDate, -i);
    const dateString = date.toISOString().split('T')[0]; // 날짜를 'yyyy-mm-dd' 형식의 문자열로 변환

    const log = logs.find((log) => log.date === dateString);
    console.log(log);

    data.push({
      date: dateString,
      count: log ? log.state : 0,
      studyTime: log ? convertStudyTime(log?.studyTime) : '0초',
    });
  }
  return data;
};

const convertStudyTime = (seconds: number | undefined) => {
  if (!seconds) return '0초';
  if (seconds < 60) {
    return `${seconds}초`;
  } else if (seconds < 3600) {
    const minutes = parseInt(`${seconds / 60}`);
    const second = seconds % 60;

    return `${minutes}분 ${second}초`;
  }
  const hours = parseInt(`${seconds / (60 * 60)}`);
  const temp = seconds % (60 * 60);
  const minutes = parseInt(`${temp / 60}`);
  const second = temp % 60;
  return `${hours}시간 ${minutes}분 ${second}초`;
};
