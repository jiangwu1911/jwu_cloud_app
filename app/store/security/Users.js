Ext.define('CloudApp.store.security.Users', {
    extend: 'Ext.data.Store',
    requires: [ 
        'CloudApp.model.security.User' 
    ],
    model: 'CloudApp.model.security.User',
    storeId: 'users',
    autoLoad: false,
    proxy: {
        type: 'ajax',
        url: API_URL + '/users',
        reader: {
            type: 'json',
            root: 'users'
        }
    },
});
