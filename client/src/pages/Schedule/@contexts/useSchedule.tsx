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
  // setShow: React.Dispatch<React.SetStateAction<boolean>>;
  reset: () => void;
};

const initialState: ContextProp = {
  show: false,
  day: '',
  firstOfMonth: undefined,
  setDay: () => {},
  setFirstOfMonth: () => {},
  reset: () => {},
  // setShow: () => {},
};

const ScheduleContext = createContext<ContextProp>(initialState);

function isDate(date: Date | undefined): date is Date {
  return date instanceof Date;
}

export const ScheduleProvider = ({ children }: Props) => {
  const [day, setDay] = useState('');
  const [firstOfMonth, setFirstOfMonth] = useState<Date>();
  let show = !!day && isDate(firstOfMonth);

  // const [show, setShow] = useState(!!day && isDate(firstOfMonth));

  const reset = () => {
    setDay('');
    setFirstOfMonth(undefined);
  };

  return (
    <ScheduleContext.Provider
      value={{
        show,
        day,
        setDay,
        firstOfMonth,
        setFirstOfMonth,
        reset,
        // setShow,
      }}
    >
      {children}
    </ScheduleContext.Provider>
  );
};

export const useScheduleContext = () => {
  return useContext(ScheduleContext);
};
