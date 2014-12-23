Ext.define('CloudApp.view.cloud.Logs', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.logs',

    layout: {
        type: 'fit'
    },
    dockedItems: [
        {
            xtype: 'toolbar',
            flex: 1,
            dock: 'top',
        }
    ],
});
