type DummyTodoData = {
  data: Todo[];
};
type Todo = {
  id: string;
  todo: string;
};
export const getTodoDummy = new Promise<DummyTodoData>((resolve, reject) => {
  resolve({
    data: [
      { id: '1', todo: '타입스크립트 공부하기' },
      { id: '2', todo: '테스트코드 작성 연습하기' },
      { id: '3', todo: '시험 공부하기' },
    ],
  });
});
