Ext.define('CloudApp.store.security.Depts', {
    extend: 'Ext.data.Store',
    requires: [
        'CloudApp.model.security.Dept'
    ],
    model: 'CloudApp.model.security.Dept',
    storeId: 'depts',
    autoLoad: true,
    proxy: {
        type: 'ajax',
        url: API_URL + '/depts',
        headers: { 'X-Auth-Token': Ext.util.Cookies.get('user_token') },
        reader: {
            type: 'json',
            root: 'depts'
        }
    }
});
