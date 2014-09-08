Ext.define('CloudApp.view.cloud.ImagesList', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.imageslist',

    frame: true,
    store: 'cloud.Images',

    columns: [
        {
            width: 200,
            dataIndex: 'name',
            flex: 1,
            text: '名称'
        },
        {
            width: 200,
            dataIndex: 'OS-EXT-IMG-SIZE:size',
            text: '大小(bytes)'
        },
        {
            width: 200,
            dataIndex: 'status',
            text: '状态'
        },
    ]
});
