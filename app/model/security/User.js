Ext.define('CloudApp.model.security.User', {
    extend: 'Ext.data.Model',

    idProperty: 'id',

    fields: [
        { name: 'id' },
        { name: 'name' },
        { name: 'email' },
        { name: 'dept_id' }
    ]
});
