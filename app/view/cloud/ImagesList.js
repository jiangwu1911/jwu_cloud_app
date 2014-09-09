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
            dataIndex: 'size',
            text: '大小(bytes)'
        },
        {
            width: 200,
            dataIndex: 'status',
            text: '状态'
        },
        {
            width: 150,
            dataIndex: 'created_at',
            text: '创建于',
            renderer: function(value, meta, record) {
                meta.attr = 'style="white-space:normal;"';
                return value;
            }
        },
    ]
});
