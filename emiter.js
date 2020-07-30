
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
        var queue1 = 'juan';
        var queue2 = 'pedro';
        var msg1 = 'Hello juan';
        var msg2 = 'Hello pedro';

        channel.assertQueue(queue1, {
            durable: false
        });

        channel.assertQueue(queue2, {
            durable: false
        });

        channel.sendToQueue(queue2, Buffer.from(msg2));
        console.log(" [x] Sent %s", msg2);

        channel.sendToQueue(queue1, Buffer.from(msg1));
        console.log(" [x] Sent %s", msg1);
    });

    setTimeout(function () {
        connection.close();
        process.exit(0)
    }, 500);
});

