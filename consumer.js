var amqp = require('amqplib/callback_api');
var amqpConn = null;

amqp.connect('amqp://admin:secret@localhost', function (error0, connection) {
    if (error0) {
        console.log(error0);
        throw error0;
    }
    connection.createChannel(function (error1, channel) {
        if (error1) {
            throw error1;
        }
        var queue = 'pedro';

        // channel.assertQueue(queue, {
        //     durable: false
        // });
        console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", queue);
        channel.consume(queue, function (msg) {
            console.log(" [x] Received %s", msg.content.toString());
        }, {
            noAck: true
        });
    });
});