Ext.define('CloudApp.view.authentication.CapsLockTooltip', {
    extend: 'Ext.tip.QuickTip',
    alias: 'widget.capslocktooltip',

    target: 'password',
    anchor: 'top',
    anchorOffset: 0,
    width: 300,
    dismissDelay: 0,
    autoHide: false,
    title: '<div class="capslock">'+ '键盘处于大小写锁定状态' + '</div>',
    html: '<div>'+ '键盘处于大小写锁定状态,' + '</div>' +
        '<div>'+ '这会导致密码输入错误.' + '</div>'
});
