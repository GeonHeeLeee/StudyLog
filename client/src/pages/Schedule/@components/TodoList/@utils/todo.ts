import { TodoState } from '../Todo.component';

export function checkNotFinish(
  state: TodoState
): state is Exclude<TodoState, 'finish'> {
  if (state === 'start' || state === 'doing') return true;
  else return false;
}

export function setTodoState(
  startTime: string | undefined,
  endTime: string | undefined
) {
  if (!startTime && !endTime) return 'start';
  if (startTime && !endTime) return 'doing';
  if (startTime && endTime) return 'finish';
  return 'start';
}
