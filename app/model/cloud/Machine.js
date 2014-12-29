Ext.define('CloudApp.model.cloud.Machine', {
    extend: 'Ext.data.Model',

    idProperty: 'id',

    fields: [
        { name: 'hostname' },
        { name: 'state' },
        { name: 'status' },
        { name: 'disabled_reason' },
    ]
});
