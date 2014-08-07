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
        }
    }
});
