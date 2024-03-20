/**
 * Delays a message for a specified amount of time.
 * @param {number} duration - Duration in milliseconds to delay the message.
 * @returns {Promise<string>} A promise that resolves with a message.
 */
const delayMessage = (duration) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve('Thanks for waiting!');
        }, duration);
    });
};

export default delayMessage;