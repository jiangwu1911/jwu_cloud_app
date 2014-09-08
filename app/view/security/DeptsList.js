Ext.define('CloudApp.view.security.DeptsList', {
    extend: 'Ext.tree.Panel',
    alias: 'widget.deptslist',

    title: '部门',
    frame: true,

    rootVisible: false,
    useArrows: true,
    store: 'security.DeptsTree',
    tools: [{
        type: 'refresh',
        handler: function() {
            tree_store.load({
                scopt: this,
                callback: function(records, operation, success) {
                    this.getRootNode().eachChild(function(child) { 
                        child.expand(); 
                    });
                }
            });
        }
    }],
    collapsible: true,
    listeners: {
        'load': function() {
            this.expandAll();
        },
    },

    dockedItems: [
        {
            xtype: 'toolbar',
            dock: 'top',
            items: [
                {
                    xtype: 'button',
                    itemId: 'add',
                    iconCls: 'add',
                    text: '创建'
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
