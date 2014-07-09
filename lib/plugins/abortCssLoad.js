module.exports = {
    enginePageCreate: function (engine) {
        if (engine.phantom !== undefined) {
            engine.phantom.page.onResourceRequested(function (requestData, networkRequest) {
                var regex = /.+\.css$/i;
                if (regex.test(requestData.url)) {
                    networkRequest.abort();
                }
            });
        }
    }
};
