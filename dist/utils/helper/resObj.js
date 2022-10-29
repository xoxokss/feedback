"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resObj = void 0;
exports.resObj = {
    /**
     * {status, data}
     * 성공시 응답 객체를 생성합니다.
     */
    success: function (_a) {
        var status = _a.status, data = _a.data;
        return {
            success: true,
            status: status,
            data: data,
        };
    },
    /**
     * {status, message}
     * 실패시 응답 메세지를 포함한 객체를 생성합니다
     */
    alert: function (_a) {
        var status = _a.status, message = _a.message;
        return { success: false, status: status, message: message };
    },
    /**
     * {status, error}
     * 실패시 에러를 포함한 객체를 생성합니다
     */
    failed: function (_a) {
        var status = _a.status, error = _a.error;
        return {
            success: false,
            status: status,
            error: error.toString(),
        };
    },
};
