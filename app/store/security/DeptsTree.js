Ext.define('CloudApp.store.security.DeptsTree', {
    extend: 'Ext.data.TreeStore',
    storeId: 'depts_tree',
    autoLoad: false,
    root: { expanded: false },
    proxy: {
        type: 'ajax',
        url: API_URL + '/depts',
        reader: { type: 'json', },
        extraParams:  { 'format': 'as_tree' },
    }
});
