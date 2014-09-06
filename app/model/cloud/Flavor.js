Ext.define('CloudApp.model.cloud.Flavor', {
    extend: 'Ext.data.Model',

    idProperty: 'id',

    fields: [
        { name: 'id' },
        { name: 'name' },
        { name: 'vcpus' },
        { name: 'ram' },
        { name: 'disk' },
        { name: 'ephemeral' },
        { name: 'swap' },
    ]
});
