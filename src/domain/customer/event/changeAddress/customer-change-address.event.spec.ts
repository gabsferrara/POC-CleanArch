import EventDispatcher from "../../../@shared/event/event-dispatcher";
import CustomerChangeAddressEvent from "./customer-change-address.event";
import SendConsoleLogHandler from "./handler/send-console-log.handler";


describe("Customer change address events test", () => {
    
    it("should notify all event customer created handlers", () => {

        const eventDispatcher = new EventDispatcher();
        const eventHandler = new SendConsoleLogHandler();
        const spyEventHandler = jest.spyOn(eventHandler, "handle")

        eventDispatcher.register("CustomerChangeAddressEvent", eventHandler);


        expect(eventDispatcher.getEventHandlers["CustomerChangeAddressEvent"][0]).toMatchObject(eventHandler);

        const customerChangeAddressEvent = new CustomerChangeAddressEvent({
            id: "1",
            nome: "Cliente 1",
            endereco: "Rua teste 2"
        });


        eventDispatcher.notify(customerChangeAddressEvent);

        expect(spyEventHandler).toHaveBeenCalled();

    })
});