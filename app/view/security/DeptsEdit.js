Ext.define('CloudApp.view.security.DeptsEdit', {
    extend: 'Ext.form.Panel',
    alias: 'widget.deptsedit',

    requires: [
        'CloudApp.util.Util',
        //'CloudApp.view.security.UsersList'
    ],

    layout: {
        align: 'stretch',
        type: 'vbox'
    },
    bodyPadding: 10,
    title: '编辑选中的部门',

    items: [
        {
            xtype: 'fieldset',
            height: 100,
            title: '部门信息',
            defaults: {
                afterLabelTextTpl: CloudApp.util.Util.required,
                anchor: '100%',
                xtype: 'textfield',
                allowBlank: false,
                msgTarget: 'under'
            },
            items: [
                {
                    xtype: 'hiddenfield',
                    fieldLabel: 'Label',
                    name: 'id'
                },
                {
                    fieldLabel: '部门名称',
                    name: 'name',
                    maxLength: 45,
                    minLength: 3
                }
            ]
        },
        /*{
            xtype: 'userslist',
            emptyText: '没有员工.',
            title: '员工列表',
            hideGroup: true,
            flex: 1
        }*/
    ],
    dockedItems: [
        {
            xtype: 'toolbar',
            flex: 1,
            dock: 'bottom',
            layout: {
                pack: 'end',
                type: 'hbox'
            },
            items: [
                {
                    xtype: 'button',
                    text: '取消',
                    itemId: 'cancel',
                    iconCls: 'cancel'
                },
                {
                    xtype: 'button',
                    text: '保存',
                    itemId: 'save',
                    iconCls: 'save'
                }
            ]
        }
    ]

});
