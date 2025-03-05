export const notifications = [
    {
        id: 1,
        title: "General Reminders",
        type: "generalReminders",
        events: [
            { id: 1, date: "10 MAR", time: "09:00", title: "Team Meeting", description: "Weekly sync-up with the team to discuss project updates and next steps." },
            { id: 2, date: "15 APR", time: "14:30", title: "Dentist Appointment", description: "Routine dental check-up and cleaning appointment." },
            { id: 3, date: "20 MAY", time: "16:00", title: "Friend's Birthday", description: "Reminder to buy a gift and attend John's birthday dinner." },
            { id: 4, date: "TODAY", time: "11:00", title: "Gym Session", description: "Scheduled workout session to stay on track with fitness goals." },
            { id: 5, date: "TODAY", time: "08:00", title: "Flight to NYC", description: "Early morning flight for business trip, don't forget to check in online." }
        ],
    },
    {
        id: 2,
        title: "Spending Completion",
        type: "spendingCompletion",
        events: [
            { id: 6, date: "05 FEB", time: "12:00", title: "Subscription Renewal", description: "Your annual streaming service subscription has been fully paid." },
            { id: 7, date: "18 JUN", time: "15:00", title: "Loan Installment Paid", description: "Final installment for your car loan has been successfully completed." },

        ],
    },
    {
        id: 3,
        title: "Spending Alerts",
        type: "spendingAlerts",
        events: [
            { id: 9, date: "TODAY", time: "18:30", title: "Over Budget Alert", description: "Your dining expenses have exceeded the monthly budget limit." },
            { id: 10, date: "TODAY", time: "20:00", title: "Large Transaction Alert", description: "A purchase of $1,500 was made at an electronics store. Verify if this was authorized." },
            { id: 11, date: "TODAY", time: "10:15", title: "Subscription Increase", description: "Your premium streaming service has increased in price by 10%." },
            { id: 12, date: "05 AUG", time: "22:00", title: "ATM Withdrawal Alert", description: "A high-value withdrawal was made from your account. Ensure it was you." }
        ],
    },
];