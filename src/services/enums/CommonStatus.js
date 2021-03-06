export default class CommonStatus {
    ACTIVE = 1;
    DELETED = -1;
    static getInstance() {
        if (!CommonStatus._instance) {
            CommonStatus._instance = new this();
        }
        return this._instance;
    }
}