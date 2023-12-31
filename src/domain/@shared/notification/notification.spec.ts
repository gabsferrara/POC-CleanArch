import Notification from "./notification";

describe('Unit test for notifications', ()=>{
    it('should create errors', () => {
        const notification = new Notification();
        const error = {
            message: "error message",
            context: "customer",
        }

        notification.addError(error);

        expect(notification.messages("customer")).toBe("customer: error message")

        const error2 = {
            message: "error message2",
            context: "order",
        }

        const error3 = {
            message: "error message3",
            context: "customer",
        }

        notification.addError(error2);
        notification.addError(error3);

        expect(notification.messages("customer")).toBe("customer: error message,customer: error message3");
        expect(notification.messages()).toBe("customer: error message,order: error message2,customer: error message3");


    })

    it('should check if notification has at least one error', () => {
        const notification = new Notification();
        const error = {
            message: "error message",
            context: "customer",
        }

        notification.addError(error);

        expect(notification.hasErrors()).toBe(true);
    })

    it('should get all errors props', () => {
        const notification = new Notification();
        const error = {
            message: "error message",
            context: "customer",
        }

        notification.addError(error);

        expect(notification.getErrors()).toEqual([error])
    })
})