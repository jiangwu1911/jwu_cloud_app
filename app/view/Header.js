Ext.define('CloudApp.view.Header', {
    extend: 'Ext.toolbar.Toolbar',
    alias: 'widget.appheader',

    height: 30,
    ui: 'footer',
    style: 'border-bottom: 4px solid #4c72a4;',

    items: [
        {
            xtype: 'label',
            html: '<div id="titleHeader">Video Store Manager<span style="font-size:12px;"> - Mastering Ext JS</span></div>'
        },
        {
            xtype: 'tbfill'
        },
        {
            xtype: 'tbseparator'
        },
        {
            xtype: 'button',
            text: '退出',
            itemId: 'logout',
            iconCls: 'logout'
        }
    ]
});
