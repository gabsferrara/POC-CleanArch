import { Sequelize } from "sequelize-typescript";
import OrderRepository from "./order.repository";
import Customer from "../../../../domain/customer/entity/customer";
import Address from "../../../../domain/customer/value-object/adress";
import Product from "../../../../domain/product/entity/product";
import OrderItem from "../../../../domain/checkout/entity/order_item";
import Order from "../../../../domain/checkout/entity/order";
import CustomerRepository from "../../../customer/repository/sequelize/customer.repository";
import ProductRepository from "../../../product/repository/sequelize/product.repository";
import CustomerModel from "../../../customer/repository/sequelize/customer.model";
import OrderModel from "./order.model";
import OrderItemModel from "./orderItem.model";
import ProductModel from "../../../product/repository/sequelize/product.model";


describe("Order repository test", () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });

    await sequelize.addModels([CustomerModel, OrderModel, OrderItemModel, ProductModel]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it("should create a new order", async () => {

    const customerRepository = new CustomerRepository();
    const customer = new Customer("123", "Customer 1");
    const address = new Address("Street 1", 1, "Zipcode 1", "City 1");
    customer.changeAddress(address);
    await customerRepository.create(customer);

    const productRepository = new ProductRepository();
    const product = new Product("123", "Product 1", 10);
    await productRepository.create(product);

    const orderItem = new OrderItem(
      "1",
      product.name,
      product.price,
      product.id,
      2
    );

    const order = new Order("123", "123", [orderItem])
    const orderRepository = new OrderRepository();
    await orderRepository.create(order);

    const orderModel = await OrderModel.findOne({
      where: { id: order.id },
      include: ["items"],
    });

    expect(orderModel.toJSON()).toStrictEqual({
      id: "123",
      customer_id: "123",
      total: order.total(),
      items: [
        {
          id: orderItem.id,
          name: orderItem.name,
          price: orderItem.price,
          quantity: orderItem.quantity,
          order_id: "123",
          product_id: "123"
        }
      ]
    })


  })

  it("should update a order", async () => {

    const customerRepository = new CustomerRepository();
    const customer = new Customer("123", "Customer 1");
    const customer2 = new Customer("99", "Customer 2");
    const address = new Address("Street 1", 1, "Zipcode 1", "City 1");
    customer.changeAddress(address);
    customer2.changeAddress(address);
    await customerRepository.create(customer);
    await customerRepository.create(customer2);

    const productRepository = new ProductRepository();
    const product = new Product("1", "Product 1", 10);
    await productRepository.create(product);

    const orderItem = new OrderItem(
      "1",
      product.name,
      product.price,
      product.id,
      2
    );

    const product2 = new Product("2", "Product 2", 20);
    await productRepository.create(product2);

    const orderItem2 = new OrderItem(
      "2",
      product2.name,
      product2.price,
      product2.id,
      1
    );


    const order = new Order("123", "123", [orderItem])
    const orderRepository = new OrderRepository();
    await orderRepository.create(order);

    const newItems = [orderItem, orderItem2]


    order.changeItems(newItems);
    order.changeCustomer(customer2.id)

    await orderRepository.update(order);


    const orderModel = await OrderModel.findOne({
      where: { id: order.id },
      include: ["items"],
    });

    expect(orderModel.items).toHaveLength(2);
    expect(orderModel.toJSON()).toStrictEqual({
      id: "123",
      customer_id: "99",
      total: order.total(),
      items: [
        {
          id: orderItem.id,
          name: orderItem.name,
          price: orderItem.price,
          quantity: orderItem.quantity,
          order_id: "123",
          product_id: "1"
        },
        {
          id: orderItem2.id,
          name: orderItem2.name,
          price: orderItem2.price,
          quantity: orderItem2.quantity,
          order_id: "123",
          product_id: "2"
        }
      ]
    })

  })

  describe("Find methods", () => {

    const customer1 = new Customer("123", "Customer 1");
    const customer2 = new Customer("456", "Customer 2");
    const address = new Address("Street 1", 1, "Zipcode 1", "City 1");
    customer1.changeAddress(address);
    customer2.changeAddress(address)

    const product1 = new Product("123", "Product 1", 10);
    const product2 = new Product("456", "Product 2", 15);

    const orderItem1 = new OrderItem(
      "1",
      product1.name,
      product1.price,
      product1.id,
      2
    );

    const orderItem2 = new OrderItem(
      "2",
      product2.name,
      product2.price,
      product2.id,
      3
    );

    const orderItem3 = new OrderItem(
      "3",
      product1.name,
      product1.price,
      product1.id,
      1
    );

    const order1 = new Order("123", "123", [orderItem1]);
    const order2 = new Order("456", "456", [orderItem2, orderItem3]);
    const orders = [order1, order2]

    beforeEach(async () => {
      const customerRepository = new CustomerRepository();
      const productRepository = new ProductRepository();
      const orderRepository = new OrderRepository();

      await customerRepository.create(customer1);
      await customerRepository.create(customer2);
      await productRepository.create(product1);
      await productRepository.create(product2);
      await orderRepository.create(order1);
      await orderRepository.create(order2);
    })


    it("should find all orders", async () => {

      const orderRepository = new OrderRepository();
      const orderResult = await orderRepository.findAll();

      expect(orderResult.length).toEqual(2);
      expect(orderResult).toEqual(orders);

    })

    it("should find a order", async () => {

      const orderRepository = new OrderRepository();
    
      const orderResult = await orderRepository.find(order1.id);
  
      expect(orderResult).toStrictEqual(order1)
    })

  })

});