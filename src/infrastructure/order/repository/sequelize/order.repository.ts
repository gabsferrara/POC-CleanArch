import Order from "../../../../domain/checkout/entity/order";
import OrderItem from "../../../../domain/checkout/entity/order_item";
import OrderRepositoryInterface from "../../../../domain/checkout/repository/order-repository.interface";
import OrderModel from "./order.model";
import OrderItemModel from "./orderItem.model";


export default class OrderRepository implements OrderRepositoryInterface {
  async create(entity: Order): Promise<void> {
    await OrderModel.create({
      id: entity.id,
      customer_id: entity.customerId,
      total: entity.total(),
      items: entity.items.map((item) => ({
        id: item.id,
        name: item.name,
        price: item.price,
        product_id: item.productId,
        quantity: item.quantity
      }))
    },
      {
        include: [{ model: OrderItemModel }]
      });
  }

  async update(entity: Order): Promise<void> {
      await OrderItemModel.destroy({
        where: {
          order_id: entity.id
        }
      });
      for(const item of entity.items){
        await OrderItemModel.create({
          id: item.id,
          product_id: item.productId,
          order_id: entity.id,
          quantity: item.quantity,
          name: item.name,
          price: item.price,
        })
      }
      await OrderModel.update(
        {
          customer_id: entity.customerId,
          total: entity.total()
        },
        {
          where: {
            id: entity.id
          }
        }
      );    
    
  }

  async find(id: string): Promise<Order> {

    let orderReturn = await OrderModel.findOne({
      where: { id },
      include: ["items"],
    });
    let orderItems = []
    for(let item of orderReturn.items){
      orderItems.push(new OrderItem(item.id, item.name, item.price, item.product_id, item.quantity))
    }
    const order = new Order(orderReturn.id, orderReturn.customer_id, orderItems);
    return order
  }

  async findAll(): Promise<Order[]> {

    let orders: Order[] = [];

    let ordersModel = await OrderModel.findAll({
      include: ["items"],
    });

    for(let order of ordersModel){
      let orderItems = []
      for(let item of order.items){
        orderItems.push(new OrderItem(item.id, item.name, item.price, item.product_id, item.quantity))
      }
      const newOrder = new Order(order.id, order.customer_id, orderItems);
      orders.push(newOrder)
    }
    return orders
  }


}