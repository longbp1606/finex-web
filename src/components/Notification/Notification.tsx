import React, { useState } from "react";
import { Badge } from "antd";
import { BellOutlined, MessageOutlined, CalendarOutlined, CheckCircleOutlined, ExclamationCircleOutlined, InboxOutlined } from "@ant-design/icons";
import { StyledModal, NotificationItem, StyledNotificationButton } from "./Notification.styled";
import { Divider } from "antd";
import { theme } from "@/themes";

const notifications = [
    {
        id: 1,
        icon: <MessageOutlined className="icon" style={{ color: "#FF8C00" }} />,
        title: "New message",
        description: "Hey, just wanted to follow up on our plan yesterday.",
        time: "2 hours ago",
    },
    {
        id: 2,
        icon: <CalendarOutlined className="icon" style={{ color: "#1890ff" }} />,
        title: "Upcoming event",
        description: "Tomorrow is payday, don't forget to update your new spending plan.",
        time: "1 day ago",
    },
    {
        id: 3,
        icon: <CheckCircleOutlined className="icon" style={{ color: "#52c41a" }} />,
        title: "Spending plan completed",
        description: 'You completed the "Take a trip - DL" spending plan.',
        time: "3 days ago",
    },
    {
        id: 4,
        icon: <ExclamationCircleOutlined className="icon" style={{ color: "#faad14" }} />,
        title: "Over Budget Alert",
        description: "The budget limit for the category 'Tet Shopping' has been exceeded. Please adjust your spending accordingly.",
        time: "1 week ago",
    },
];

const Notification: React.FC = () => {
    const [visible, setVisible] = useState(false);

    return (
        <>
            <Badge style={{ marginRight: "20px"}} count={notifications.length}>
                <StyledNotificationButton
                    shape="circle"
                    icon={<BellOutlined style={{ fontSize: "24px"}} />}
                    onClick={() => setVisible(true)}
                />
            </Badge>

            <StyledModal
                title={
                    <div>
                        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                            <div>
                                <h3 style={{ marginBottom: "4px" }}>Notifications</h3>
                                <p style={{ fontSize: "12px", fontWeight: 400, color: "#888", marginTop: "-3px" }}>
                                    You have {notifications.length} new notifications.
                                </p>
                            </div>
                            <InboxOutlined
                                style={{
                                    fontSize: "22px",
                                    color: "#888",
                                    cursor: "pointer",
                                    alignSelf: "center"
                                }}
                            />
                        </div>
                        <Divider style={{ marginBottom: "-15px", marginTop: "15px", backgroundColor: `${theme.color.primary}` }} />
                    </div>
                }
                open={visible}
                onCancel={() => setVisible(false)}
                footer={null}
                closeIcon={null}
            >

                {notifications.map((item) => (
                    <NotificationItem key={item.id}>
                        {item.icon}
                        <div className="content">
                            <h4>{item.title}</h4>
                            <p>{item.description}</p>
                        </div>
                        <div className="time">{item.time}</div>
                    </NotificationItem>
                ))}
            </StyledModal >

        </>
    );
};

export default Notification;
