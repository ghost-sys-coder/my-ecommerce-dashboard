import moment from "moment";

/**
 * ! Function calculates time
 */
export const calculateTime = (createdAt) => {
    const now = moment();
    const productCreatedAt = moment(createdAt);

    const duration = moment.duration(now.diff(productCreatedAt));
    const days = duration.asDays();
    const hours = duration.asHours();
    const minutes = duration.asMinutes();

    if (days >= 1) {
        return `${Math.floor(days)} days ago`;
    } else if (hours >= 1) {
        return `${Math.floor(hours)} hours ago`;
    } else {
        return `${Math.floor(minutes)} minutes ago`;
    }
}