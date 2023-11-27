import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type Schedule = {
  scheduleId?: string;
  todo?: string;
  startTime?: string;
  endTime?: string;
};

type Actions = {
  clear: () => void;
  setSchedule: () => void;
};

const initalState: Schedule = {};

const useScheduleState = create<Schedule & Actions>()(
  persist(
    (set, get) => ({
      ...initalState,
      clear: () => {
        set(initalState);
      },
      setSchedule: () => {
        
      },
    }),
    { name: 'schedule' }
  )
);

export default useScheduleState;
