Ext.define('CloudApp.view.cloud.Console', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.console',

    layout: {
        type: 'fit'
    },
    dockedItems: [
        {
            xtype: 'toolbar',
            flex: 1,
            dock: 'top',
            items: [
                {
                    xtype: 'tbtext',
                    name: 'desc',
                    text: '如果无法在终端窗口输入字符，请点击终端窗口上部的灰色部分。如果出现连接错误请先关闭标签页再重新打开。',
                }
            ],
        }
    ],
});
