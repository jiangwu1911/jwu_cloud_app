Ext.define('CloudApp.view.security.UsersList', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.userslist',

    frame: true,
    store: Ext.create('CloudApp.store.security.Users'),

    columns: [
        {
            width: 150,
            dataIndex: 'name',
            flex: 1,
            text: '姓名'
        },
        {
            width: 150,
            dataIndex: 'email',
            text: '邮箱'
        },
        {
            width: 150,
            dataIndex: 'dept_id',
            text: '所属部门',
            renderer: function(value, metaData, record ){
                var deptsStore = Ext.getStore('security.DeptsForParentList');
                var dept = deptsStore.findRecord('id', value);
                return dept != null ? dept.get('name') : value;
            }
        }
    ]
});
