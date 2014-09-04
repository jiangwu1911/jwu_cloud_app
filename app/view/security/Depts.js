Ext.define('CloudApp.view.security.Depts', {
    extend: 'Ext.container.Container',
    alias: 'widget.depts',

    requires: [
        'CloudApp.view.security.DeptsList',
        'CloudApp.view.security.DeptsEdit'
    ],

    layout: {
        type: 'hbox',
        align: 'stretch'
    },

    items: [
        {
            xtype: 'deptslist',
            flex: 1
        },
        {
            xtype: 'deptsedit',
            flex: 2
        }
    ]
});
