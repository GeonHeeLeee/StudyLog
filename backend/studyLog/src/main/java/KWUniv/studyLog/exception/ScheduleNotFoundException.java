package KWUniv.studyLog.exception;

public class ScheduleNotFoundException extends RuntimeException{
    public ScheduleNotFoundException(String s) {
        super("Schedule not found");
    }
}
