import { SessionsClient } from 'dialogflow';

const projectId = 'hungerexpressagent-rxdy'; 
const sessionId = 'quickstart-session-id'; 
const languageCode = 'en-US';

const sessionClient = new SessionsClient();
const sessionPath = sessionClient.sessionPath(projectId, sessionId);

export const sendMessageToDialogflow = async (text) => {
    const request = {
        session: sessionPath,
        queryInput: {
            text: {
                text: text,
                languageCode: languageCode,
            },
        },
    };

    const responses = await sessionClient.detectIntent(request);
    return responses[0].queryResult.fulfillmentText;
}
