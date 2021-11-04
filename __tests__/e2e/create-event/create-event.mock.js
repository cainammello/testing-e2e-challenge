module.exports.eventToAdd = {
    title: "Create Event Test",
    eventDate: new Date("10-15-2021"),
    eventTime: {
        initial: "T000000" ,
        final: "T013000"
    },
    notificationToSelect: "10 minutes",
    customNotification: {
        type: "Email",
        number: "35",
        period: "days"
    }
}
