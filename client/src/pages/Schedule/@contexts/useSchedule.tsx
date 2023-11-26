import { createContext, useContext, useState } from 'react';

type Props = {
  children: React.ReactNode;
};

type ContextProp = {
  show: boolean;
  day: string;
  setDay: React.Dispatch<React.SetStateAction<string>>;
  firstOfMonth: Date | undefined;
  setFirstOfMonth: React.Dispatch<React.SetStateAction<Date | undefined>>;
  reset: () => void;
};

const initialState: ContextProp = {
  show: false,
  day: '',
  firstOfMonth: undefined,
  setDay: () => {},
  setFirstOfMonth: () => {},
  reset: () => {},
};

const ScheduleContext = createContext<ContextProp>(initialState);

export const ScheduleProvider = ({ children }: Props) => {
  const [day, setDay] = useState('');
  const [firstOfMonth, setFirstOfMonth] = useState<Date>();

  const show = !!day && !!firstOfMonth;
  const reset = () => {
    setDay('');
    setFirstOfMonth(undefined);
  };

  return (
    <ScheduleContext.Provider
      value={{ show, day, setDay, firstOfMonth, setFirstOfMonth, reset }}
    >
      {children}
    </ScheduleContext.Provider>
  );
};

export const useScheduleContext = () => {
  return useContext(ScheduleContext);
};
