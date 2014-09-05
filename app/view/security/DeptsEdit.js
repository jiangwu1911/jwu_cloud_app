Ext.define('CloudApp.view.security.DeptsEdit', {
    extend: 'Ext.form.Panel',
    alias: 'widget.deptsedit',

    requires: [
        'CloudApp.util.Util',
        'CloudApp.view.security.UsersList'
    ],

    layout: {
        align: 'stretch',
        type: 'vbox'
    },
    bodyPadding: 10,
    title: '编辑选中的部门',

    store: 'security.Depts',

    items: [
        {
            xtype: 'fieldset',
            height: 100,
            title: '部门信息',
            defaults: {
                afterLabelTextTpl: CloudApp.util.Util.required,
                anchor: '100%',
                xtype: 'textfield',
                msgTarget: 'under',
                allowBlank: false
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
                    minLength: 1,
                },
                {
                    afterLabelTextTpl: '',
                    fieldLabel: '说明', 
                    name: 'desc',
                    maxLength: 200,
                    minLength: 0,
                    allowBlank: true,
                },
                {
                    afterLabelTextTpl: '',
                    xtype: 'combobox',
                    fieldLabel: '所属部门',
                    itemId: 'parent_list',
                    store: 'security.Depts',
                    displayField: 'name',
                    valueField: 'id',
                    emptyText: '无',
                    allowBlank: true,
                    triggerAction: 'all',
                    editable: false,
                }
            ]
        },
        {
            xtype: 'userslist',
            emptyText: '没有员工。',
            title: '员工列表',
            hideGroup: true,
            flex: 1,
            itemId: 'deptuserslist',
        }
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
