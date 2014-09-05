Ext.define('CloudApp.store.security.Depts', {
    extend: 'Ext.data.Store',
    requires: [
        'CloudApp.model.security.Dept'
    ],
    model: 'CloudApp.model.security.Dept',
    storeId: 'depts',
    autoLoad: false,
    proxy: {
        type: 'ajax',
        url: API_URL + '/depts',
        reader: {
            type: 'json',
            root: 'depts'
        }
    },
});
