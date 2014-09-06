Ext.define('CloudApp.model.security.User', {
    extend: 'Ext.data.Model',

    idProperty: 'id',

    fields: [
        { name: 'id' },
        { name: 'name' },
        { name: 'password' },
        { name: 'email' },
        { name: 'dept_id' },
        { name: 'role_id' },
        { name: 'role_name' },
    ]
});
