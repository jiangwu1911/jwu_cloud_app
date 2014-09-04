Ext.define('CloudApp.view.security.DeptsList', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.deptslist',

    title: '部门',
    frame: true,

    store: 'security.Depts',

    columns: [
        {
            xtype: 'gridcolumn',
            dataIndex: 'name',
            flex: 1,
            text: '名称'
        }
    ],
    dockedItems: [
        {
            xtype: 'toolbar',
            dock: 'top',
            items: [
                {
                    xtype: 'button',
                    itemId: 'add',
                    iconCls: 'add',
                    text: '新建'
                },
                {
                    xtype: 'button',
                    itemId: 'delete',
                    iconCls: 'delete',
                    text: '删除'
                }
            ]
        }
    ]
});
