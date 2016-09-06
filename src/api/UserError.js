function UserError(error) {

    this.originalError = error;

    this.list = [];

    if (error.response && error.response.body) {

        if (error.response.body.error.list && error.response.body.error.list.length) {
            this.list = error.response.body.error.list;
        } else {
            this.list.push({
                message: error.response.body.error.message
            });
        }

    } else {
        this.list.push({
            message: 'Server Error'
        });

        this._log();
    }
}

UserError.prototype = Error;

UserError.prototype.getList = function () {
    return this.list;
};

UserError.prototype._log = function () {
    console.log(this.originalError);
};

module.exports = UserError;
