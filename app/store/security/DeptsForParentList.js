Ext.define('CloudApp.store.security.DeptsForParentList', {
    extend: 'Ext.data.Store',
    requires: [
        'CloudApp.model.security.Dept'
    ],
    model: 'CloudApp.model.security.Dept',
    storeId: 'depts_for_parent_list',
    autoLoad: false,
    proxy: {
        type: 'ajax',
        url: API_URL + '/depts',
        reader: {
            type: 'json',
            root: 'depts'
        }
    },
    filterOnLoad: true,
});
