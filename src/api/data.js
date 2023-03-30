const { writeFile, readFile, read } = require("fs");
const { lockedChannels } = require("./data.json")

let path = "./src/api/data.json"

function test() {
    console.log("Test");
}


/**
 * This function puts a locked channel into the data.json to be saved until it is unlocked
 * @param {number} channelId - The ID of the Channel we're saving to lock
 * @returns True or False. True means success and False means Error
 */
function lockedChannel(channelId) {
    readFile(path, (error, data) => {
        if (error) {
            console.log(error);
            return;
        }
        console.log("Locked Channel " + channelId)

        const parsedData = JSON.parse(data);

        // updating name in shipping_address
        parsedData.lockedChannels[channelId] = "locked";

        writeFile(path, JSON.stringify(parsedData, null, 2), (err) => {
            if (err) {
                console.log("Failed to write updated data to file");
                return false;
            }
            console.log("Updated file successfully");
        });
    });

    return true
}


/**
 * Removes a locked channel from the json file.
 * @param {number} channelId 
 * @returns Status, True = Success, False == failure
 */
function unlockedChannels(channelId) {
    readFile(path, (error, data) => {
        if (error) {
            console.log(error);
            return;
        }
        console.log("Locked Channel " + channelId)

        const parsedData = JSON.parse(data);

        // updating name in shipping_address
        delete parsedData.lockedChannels[channelId];

        writeFile(path, JSON.stringify(parsedData, null, 2), (err) => {
            if (err) {
                console.log("Failed to write updated data to file");
                return false;
            }
            console.log("Updated file successfully");
        });
    });

    return true

}

/**
 * 
 * @param {number} channelId The ID of the locked channel
 * @param {number} messageId The ID of the Message Sent
 * @returns Status, True = Success, False == failure
 */
function setMessage(channelId, messageId) {
    readFile(path, (error, data) => {
        if (error) {
            console.log(error);
            return false;
        }
        console.log("Locked Channel " + channelId)

        const parsedData = JSON.parse(data);

        parsedData.lockedChannels[channelId] = messageId;

        writeFile(path, JSON.stringify(parsedData, null, 2), (err) => {
            if (err) {
                console.log("Failed to write updated data to file");
                return false;
            }
            console.log("Updated file successfully");
        });

        return true;
    });
}

/**
 * Gets the message id stored
 * @param {number} channelId The ID of the channel you need the message of
 * @returns Message ID stored
 */
function readMessageId(channelId) {
    readFile(path, (error, data) => {
        if (error) {
            console.log(error);
            return false;
        }

        const parsedData = JSON.parse(data);

        return parsedData.lockedChannels[channelId];
    })
}

module.exports = {
    test,
    lockedChannel,
    unlockedChannels,
    setMessage,
    readMessageId
}