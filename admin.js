const{ kafka } = require('./client');  //importing client

async function init() {
    const admin = kafka.admin();  //creating admin instance 
    console.log('Admin connecting...')
    await admin.connect();
    console.log('Admin connection success...');
    
    console.log('Creating Topic [rider-updates]');
    await admin.createTopics({
        topics: [{
            topic: 'rider-updates',
            numPartitions: 2, // 0-north, 1-south
        }]
    })
    console.log('Topic Created Successfully [rider-updates]');

    console.log('Disconnecting Admin...');
    await admin.disconnect();
    
}

init();