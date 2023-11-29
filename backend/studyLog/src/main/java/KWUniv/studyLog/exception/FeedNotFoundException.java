package KWUniv.studyLog.exception;

public class FeedNotFoundException extends RuntimeException {
    public FeedNotFoundException() {
        super("Feed not found");
    }
}
