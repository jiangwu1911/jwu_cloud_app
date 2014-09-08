Ext.define('CloudApp.view.security.AllUsersList', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.alluserslist',

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
            renderer: function(value, metaData, record) {
                var deptsStore = Ext.getStore('security.Depts');
                var dept = deptsStore.findRecord('id', value);
                return dept != null ? dept.get('name') : value;
            }
        },
        {
            width: 150,
            dataIndex: 'role_name',
            text: '角色权限'
        },
        {
            width: 150,
            dataIndex: 'id',
            text: '拥有的云主机',
            renderer: function(value, metaData, record ){
                var server_names = '';
                var serversStore = Ext.getStore('cloud.Servers');
                var servers = serversStore.findBy(function(record, id) {
                    if (record.get('owner') == value) {
                        title = 'Hostname: ' + record.get('name') + '\n' 
                               + 'IP地址: ' + record.get('ip') + '\n'
                               + '虚拟内核: ' + record.get('vcpus') + '\n'
                               + '内存: ' +  record.get('ram') + 'MB\n'
                               + '根硬盘: ' + record.get('disk')+ 'GB\n'
                               + '临时硬盘: ' + record.get('ephemeral') + 'GB\n'
                               + '交换空间: ' + record.get('swap') + 'MB';

                        server_names = server_names 
                                       + '<input id="show" type=image src=resources/icons/computer.png' 
                                       + ' title="' + title + '" />'
                                       + '&nbsp;';
                    }
                });
                return server_names;
            }
        },
    ]
});
