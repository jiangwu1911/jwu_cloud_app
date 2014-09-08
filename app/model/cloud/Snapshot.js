Ext.define('CloudApp.model.cloud.Snapshot', {
    extend: 'Ext.data.Model',

    idProperty: 'id',

    fields: [
        { name: 'id' },
        { name: 'name' },
        { name: 'status' },
        { name: 'size' },
        { name: 'fault' },
        { name: 'owner' },
        { name: 'dept' },
        { name: 'created_at' },
    ]
});
