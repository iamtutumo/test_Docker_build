module.exports = {
    updateOrgs: function (object_name, record_id) {
        if (!this.record.organization) {
            toastr.warning("The associated organization of this branch has not been set and no data has been updated.");
            return;
        }

        var doUpdate = function () {
            window.$("body").addClass("loading");
            var userSession = Creator.USER_CONTEXT;
            var spaceId = userSession.spaceId;
            var authToken = userSession.authToken ? userSession.authToken : userSession.user.authToken;
            var url = "/api/v4/company/" + record_id + "/updateOrgs";
            url = Steedos.absoluteUrl(url);
            try {
                var authorization = "Bearer " + spaceId + "," + authToken;
                var fetchParams = {};
                var headers = [{
                    name: 'Content-Type',
                    value: 'application/json'
                }, {
                    name: 'Authorization',
                    value: authorization
                }];
                window.$.ajax({
                    type: "POST",
                    url: url,
                    data: fetchParams,
                    dataType: "json",
                    contentType: 'application/json',
                    beforeSend: function (XHR) {
                        if (headers && headers.length) {
                            return headers.forEach(function (header) {
                                return XHR.setRequestHeader(header.name, header.value);
                            });
                        }
                    },
                    success: function (data) {
                        console.log(data);
                        window.$("body").removeClass("loading");
                        var logInfo = "Updated successfully" + data.updatedOrgs + "organizational information and" + data.updatedSus + "piece of user information";
                        console.log(logInfo);
                        toastr.success(logInfo);
                        /* After updating the organization, refresh the branch list and directly display list information such as new associated organizations, sorting numbers, etc. */
                        window.$(".slds-page-header--object-home .btn-refresh").trigger("click");
                    },
                    error: function (XMLHttpRequest, textStatus, errorThrown) {
                        window.$("body").removeClass("loading");
                        console.error(XMLHttpRequest.responseJSON);
                        if (XMLHttpRequest.responseJSON && XMLHttpRequest.responseJSON.error) {
                            toastr.error(XMLHttpRequest.responseJSON.error.message)
                        }
                        else {
                            toastr.error(XMLHttpRequest.responseJSON)
                        }
                    }
                });
            } catch (err) {
                console.error(err);
                toastr.error(err);
                window.$("body").removeClass("loading");
            }
        }

        var text = "This operation will update the organizational division of the corresponding node (and all subordinate nodes) in the organizational structure to this division, and the divisions of the personnel in the organization will also be updated to this division. Whether to continue";
        swal({
            title: "renew“" + this.record.name + "”organize information",
            text: "<div>" + text + "？</div>",
            html: true,
            showCancelButton: true,
            confirmButtonText: t('YES'),
            cancelButtonText: t('NO')
        }, function (option) {
            if (option) {
                doUpdate();
            }
        });
    },

    updateOrgsVisible: function (object_name, record_id, record_permissions) {
        var perms, record;
        perms = {};
        if (record_permissions) {
            perms = record_permissions;
        } else {
            record = Creator.getObjectRecord(object_name, record_id);
            record_permissions = Creator.getRecordPermissions(object_name, record, Meteor.userId());
            if (record_permissions) {
                perms = record_permissions;
            }
        }
        return perms["allowEdit"];
    },
}