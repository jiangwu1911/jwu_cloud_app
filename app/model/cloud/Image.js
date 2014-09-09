Ext.define('CloudApp.model.cloud.Image', {
    extend: 'Ext.data.Model',

    idProperty: 'id',

    fields: [
        { name: 'id' },
        { name: 'name' },
        { name: 'status' },
        { name: 'size' },
        { name: 'fault' },
    ]
});
