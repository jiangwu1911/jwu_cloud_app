Ext.define('CloudApp.model.cloud.Volume', {
    extend: 'Ext.data.Model',

    idProperty: 'id',

    fields: [
        { name: 'id' },
        { name: 'name' },
        { name: 'status' },
        { name: 'size' },
        { name: 'fault' },
        { name: 'creator' },
        { name: 'owner' },
        { name: 'created_at' },
        { name: 'updated_at' },
    ]
});
