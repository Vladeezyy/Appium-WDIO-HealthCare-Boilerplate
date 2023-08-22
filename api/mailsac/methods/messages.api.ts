import messagesController from '../controllers/messages.controller';
class MessagesAPI {
    async getConfirmationCode(email: string) {
        await driver.pause(10000); //wait for email if it comes late
        const { data } = await messagesController.getMailsacMsgList(email);
        const msgId = data[0]._id;
        const msgText = (await messagesController.getMailsacMsgTxt(email, msgId)).data;
        const code = msgText.match(/Your password reset code is (\d{5})/)[1];
        return code;
    }
}
export default new MessagesAPI();
