Ext.define('CloudApp.model.MenuItem', {
    extend: 'Ext.data.Model',

    idProperty: 'id',

    fields: [
        { name: 'text', type: 'string' },
        { name: 'iconCls', type: 'string' },
        { name: 'id', type: 'int' },
        { name: 'parent_id', type: 'int' }
    ]
});
