import { useState } from "react";
import {
    AlertContainer,
    Column,
    Title,
    EventCard,
    EventDate,
    EventDetails,
    EventTitle,
    EventDescription,
    IconButton,
    ViewMoreButtonWrapper,
    ViewMoreButton,
} from "./Alert.styled";
import { notifications } from "./data";
import { RightOutlined } from "@ant-design/icons";

interface Event {
    id: number;
    date: string;
    time: string;
    title: string;
    description: string;
}

interface EventListProps {
    title: string;
    events: Event[];
    type: string;
    visibleCount: number;
}

const EventList: React.FC<EventListProps> = ({ title, events, type, visibleCount }) => {
    return (
        <Column>
            <Title>{title}</Title>
            {events.slice(0, visibleCount).map((event) => (
                <EventCard key={event.id}>
                    <EventDate typeof={type}>
                        <span className="date">{event.date}</span>
                        <span className="time">{event.time}</span>
                    </EventDate>
                    <EventDetails>
                        <EventTitle>{event.title}</EventTitle>
                        <EventDescription>{event.description}</EventDescription>
                    </EventDetails>
                    <IconButton>
                        <RightOutlined />
                    </IconButton>
                </EventCard>
            ))}
        </Column>
    );
};

const Alert = () => {
    const [visibleCount, setVisibleCount] = useState<number>(3);
    const hasMoreThanThree = notifications.some(({ events }) => events.length > visibleCount);

    return (
        <div>
            <AlertContainer>
                {notifications.map(({ id, title, events, type }) => (
                    <EventList key={id} title={title} events={events} type={type} visibleCount={visibleCount} />
                ))}
            </AlertContainer>

            {hasMoreThanThree && (
                <ViewMoreButtonWrapper>
                    <ViewMoreButton onClick={() => setVisibleCount(visibleCount + 3)}>
                        View More
                    </ViewMoreButton>
                </ViewMoreButtonWrapper>
            )}
        </div>
    );
};

export default Alert;
