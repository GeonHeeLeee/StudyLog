package KWUniv.studyLog.exception;

public class FeedNotFoundException extends RuntimeException {
    public FeedNotFoundException(String s) {
        super("Feed not found");
    }
}
