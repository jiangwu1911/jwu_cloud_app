Ext.define('CloudApp.util.Util', {

    statics : {
        required: '<span style="color:red;font-weight:bold" data-qtip="Required">*</span>',

        decodeJSON : function (text) {
            var result = Ext.JSON.decode(text, true);
            if (!result){
                result = {};
                result.success = false;
                result.msg = text;
            }
            return result;
        },

        showErrorMsg: function (text) {
            ret = this.decodeJSON(text)
            Ext.Msg.show({
                title:'Error!',
                msg: ret.error.message,
                icon: Ext.Msg.ERROR,
                buttons: Ext.Msg.OK
            });
        },

        sessionTimeout: function() {
            Ext.Msg.show({
                title:'错误',
                msg: '会话超时，请重新登录。',
                icon: Ext.Msg.ERROR,
                buttons: Ext.Msg.OK,
                fn: function (btn, txt) { 
                    Ext.TaskManager.stop(CloudApp.util.SessionMonitor.countDownTask);
                    CloudApp.util.SessionMonitor.window.hide();
                    Ext.ComponentQuery.query('button#logout')[0].fireEvent('click',Ext.ComponentQuery.query('button#logout')[0]);
                }
            });
        },

        addToken: function(store) {
            store.addListener({
                beforeload:function(store, records, options){
                    store.getProxy().headers = { 'X-Auth-Token': Ext.util.Cookies.get('user_token') };
                }
            });
        },
    }
});
