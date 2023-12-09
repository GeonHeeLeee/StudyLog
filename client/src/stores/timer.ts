import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type Timer = {
  startTime?: Date;
  endTime?: Date;
  doing: boolean;
};

type Actions = {
  clear: () => void;
  startStudy: (date: Date) => void;
  finishStudy: (date: Date) => void;
  restore: () => void;
};

const initalState: Timer = {
  doing: false,
};

const useTimerState = create<Timer & Actions>()(
  persist(
    (set, get) => ({
      ...initalState,
      clear: () => {
        set(initalState);
      },
      startStudy: (startTime: Date) =>
        set({
          startTime: new Date(startTime),
          endTime: undefined,
          doing: true,
        }),
      finishStudy: (endTime: Date) =>
        set({
          endTime: new Date(endTime),
          doing: false,
        }),
      restore: () =>
        set({
          startTime: undefined,
          endTime: undefined,
          doing: false,
        }),
    }),
    { name: 'schedule' }
  )
);

export default useTimerState;
