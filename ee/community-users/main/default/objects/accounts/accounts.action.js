module.exports = {
    enableSupplier: function (object_name, record_id, fields) {
        text = 'When enabled, supplier users can be created for supplier-associated contacts. Are you sure?';
        swal({
            title: "Enable as a vendor",
            text: "<div>" + text + "</div>",
            html: true,
            showCancelButton: true,
            confirmButtonText: t('YES'),
            cancelButtonText: t('NO')
        }, function (confirm) {
            if(confirm){
                Creator.odata.update('accounts', record_id, { is_supplier: true })
            }
            sweetAlert.close();
        })
    },
    enableSupplierVisible: function (object_name, record_id, record_permissions) {
        if(!Creator.isSpaceAdmin()){
            return false
        }
        var record = Creator.getCollection(object_name).findOne(record_id);
        if(record){
            return record.is_supplier != true
        }
    },
    disableSupplier: function (object_name, record_id, fields) {
        text = 'All external users associated with this provider will be disabled. Are you sure?';
        swal({
            title: "Disable vendor account",
            text: "<div>" + text + "</div>",
            html: true,
            showCancelButton: true,
            confirmButtonText: t('YES'),
            cancelButtonText: t('NO')
        }, function (confirm) {
            if(confirm){
                Creator.odata.update('accounts', record_id, { is_supplier: false })
            }
            sweetAlert.close();
        })
    },
    disableSupplierVisible: function(object_name, record_id, record_permissions){
        if(!Creator.isSpaceAdmin()){
            return false
        }
        var record = Creator.getCollection(object_name).findOne(record_id);
        if(record){
            return record.is_supplier
        }
    },
    enableCustomer: function (object_name, record_id, fields) {
        text = 'After the customer interface is enabled, customer users can be created for associated contacts. Are you sure?';
        swal({
            title: "Enable as customer",
            text: "<div>" + text + "</div>",
            html: true,
            showCancelButton: true,
            confirmButtonText: t('YES'),
            cancelButtonText: t('NO')
        }, function (confirm) {
            if(confirm){
                Creator.odata.update('accounts', record_id, { is_customer: true })
            }
            sweetAlert.close();
        })
    },
    enableCustomerVisible: function (object_name, record_id, record_permissions) {
        if(!Creator.isSpaceAdmin()){
            return false
        }
        var record = Creator.getCollection(object_name).findOne(record_id);
        if(record){
            return record.is_customer != true
        }
    },
    disableCustomer: function (object_name, record_id, fields) {
        text = 'All external users associated with this customer will be disabled. Are you sure?';
        swal({
            title: "Disable customer account",
            text: "<div>" + text + "</div>",
            html: true,
            showCancelButton: true,
            confirmButtonText: t('YES'),
            cancelButtonText: t('NO')
        }, function (confirm) {
            if(confirm){
                Creator.odata.update('accounts', record_id, { is_customer: false })
            }
            sweetAlert.close();
        })
    },
    disableCustomerVisible: function(object_name, record_id, record_permissions){
        if(!Creator.isSpaceAdmin()){
            return false
        }
        var record = Creator.getCollection(object_name).findOne(record_id);
        if(record){
            return record.is_customer
        }
    },
}