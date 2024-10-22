package main.java.inctrl.common.models.notifications;

import java.util.Date;
import java.util.UUID;

public class Event {
    UUID eventId;
    EventType type;
    Object target;
    Object data;
    Date createdAt;
    Date processedTimestampUnixSeconds;

    public boolean isProcessed() {
        return processedTimestampUnixSeconds != null;
    }
}
