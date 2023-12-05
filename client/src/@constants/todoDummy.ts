type DummyTodoData = {
  data: Todo[];
};
type Todo = {
  scheduleId: string;
  todo: string;
  done: boolean;
};
export const getTodoDummy = new Promise<DummyTodoData>((resolve, reject) => {
  resolve({
    data: [
      { scheduleId: '1', todo: '타입스크립트 공부하기', done: true },
      { scheduleId: '2', todo: '테스트코드 작성 연습하기', done: false },
      { scheduleId: '3', todo: '시험 공부하기', done: true },
    ],
  });
});
