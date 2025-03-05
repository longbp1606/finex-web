import { theme } from "@/themes";
import styled from "styled-components";

export const AlertContainer = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 20px;
  max-width: 1200px;
  margin: auto;
`;

export const Column = styled.div`
  flex: 1;
  min-width: 300px;
`;

export const Title = styled.h2`
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 10px;
`;

export const EventCard = styled.div`
  background: ${theme.color.quinary};
  border-radius: 12px;
  padding: 15px;
  margin-bottom: 15px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
`;

const getBackgroundColor = (type: any) => {
    switch (type) {
        case "generalReminders":
            return "#E9F0F4";
        case "spendingCompletion":
            return "#ECF4E9";
        case "spendingAlerts":
            return "#F4E9E9";
        default:
            return "#f9f9ff";
    }
};


export const EventDate = styled.div`
  background: ${(props) => getBackgroundColor(props.typeof)};
  color: #333;
  padding: 10px 20px;
  border-radius: 8px;
  text-align: center;
  min-width: 60px;

  span.date {
    font-weight: 500;
    display: block;
    font-size: 14px;
    color: ${theme.color.primary};
    font-family: "Big Shoulders Stencil", sans-serif;
  }

  span.time {
    font-weight: 600;
    display: block;
    font-size: 18px;
    color: ${theme.color.primary};
    font-family: "Big Shoulders Stencil", sans-serif;
  }
`;

export const EventDetails = styled.div`
  flex: 1;
  margin-left: 15px;
`;

export const EventTitle = styled.h3`
  font-size: 15px;
  font-weight: 600;
  opacity: 0.9; 
color: ${theme.color.primary};
`;

export const EventDescription = styled.p`
  font-size: 12px;
  color: #9096b2;
  margin: 0;
`;

export const IconButton = styled.button`
  background: none;
  border: none;
  color: ${theme.color.primary};
  font-size: 14px;
  cursor: pointer;
  padding: 0;
`;

export const ViewMoreButtonWrapper = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    margin-top: 20px;
`;

export const ViewMoreButton = styled.button`
 width: 95%;
    background: white;
    color: ${theme.color.primary};
    border: 1px solid ${theme.color.primary};
    padding: 10px 20px;
    font-size: 14px;
    font-weight: 500;
    border-radius: 6px;
    cursor: pointer;
    transition: all 0.3s ease-in-out;

    &:hover {
        background: ${theme.color.primary};
        color: white;
    }
`;