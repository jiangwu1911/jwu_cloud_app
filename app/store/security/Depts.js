Ext.define('CloudApp.store.security.Depts', {
    extend: 'Ext.data.TreeStore',
    storeId: 'depts',
    autoLoad: false,
    root: { expanded: false },
    proxy: {
        type: 'ajax',
        url: API_URL + '/depts',
        reader: { type: 'json', },
        extraParams:  { 'format': 'as_tree' },
    }
});
