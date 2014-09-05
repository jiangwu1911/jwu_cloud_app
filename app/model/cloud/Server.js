Ext.define('CloudApp.model.cloud.Server', {
    extend: 'Ext.data.Model',

    idProperty: 'id',

    fields: [
        { name: 'id' },
        { name: 'name' },
        { name: 'state' },
        { name: 'vcpus' },
        { name: 'ram' },
        { name: 'disk' },
        { name: 'ephemeral' },
        { name: 'swap' },
        { name: 'ip' },
        { name: 'created_at' },
    ]
});
