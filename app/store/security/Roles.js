Ext.define('CloudApp.store.security.Roles', {
    extend: 'Ext.data.Store',
    requires: [
        'CloudApp.model.security.Role'
    ],
    model: 'CloudApp.model.security.Role',
    storeId: 'roles',
    autoLoad: false,
    proxy: {
        type: 'ajax',
        url: API_URL + '/roles',
        reader: {
            type: 'json',
            root: 'roles'
        }
    },
});
