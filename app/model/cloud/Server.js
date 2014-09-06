Ext.define('CloudApp.model.cloud.Server', {
    extend: 'Ext.data.Model',

    idProperty: 'id',

    fields: [
        { name: 'id' },
        { name: 'name' },
        { name: 'state' },
        { name: 'task_state' },
        { name: 'vcpus' },
        { name: 'ram' },
        { name: 'disk' },
        { name: 'ephemeral' },
        { name: 'swap' },
        { name: 'ip' },
        { name: 'console_url' },
        { name: 'fault' },
        { name: 'creator' },
        { name: 'owner' },
        { name: 'created_at' },
    ]
});
