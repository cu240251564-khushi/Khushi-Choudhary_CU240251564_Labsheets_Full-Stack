const EventEmitter = require('events');

class OrderEmitter extends EventEmitter {}
const orderSystem = new OrderEmitter();

// Listen for orderPlaced event
orderSystem.on('orderPlaced', (order) => {
  console.log('\n--- RECEIPT ---');
  console.log(`Order ID: ${order.id}`);
  console.log(`Item:     ${order.item}`);
  console.log(`Amount:   $${order.amount.toFixed(2)}`);
  console.log('----------------');
});

// Emit event 3 times
orderSystem.emit('orderPlaced', { id: 101, item: 'Mechanical Keyboard', amount: 89.99 });
orderSystem.emit('orderPlaced', { id: 102, item: 'Wireless Mouse', amount: 29.50 });
orderSystem.emit('orderPlaced', { id: 103, item: 'Gaming Monitor', amount: 249.00 });