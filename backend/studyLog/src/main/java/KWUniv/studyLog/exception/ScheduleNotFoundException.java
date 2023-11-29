package KWUniv.studyLog.exception;

public class ScheduleNotFoundException extends RuntimeException{
    public ScheduleNotFoundException() {
        super("Schedule not found");
    }
}
