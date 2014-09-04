Ext.define('CloudApp.model.security.Dept', {
    extend: 'Ext.data.Model',

    idProperty: 'id',

    fields: [
        { name: 'id' },
        { name: 'name' },
        { name: 'desc' },
        { name: 'parent_id' }
    ]
});
