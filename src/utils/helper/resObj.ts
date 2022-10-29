interface IResponseObj {
	status: number;
	message?: string;
	error?: any;
	data?: any;
}

export const resObj = {
	/**
	 * {status, data}
	 * 성공시 응답 객체를 생성합니다.
	 */
	success: ({ status, data }: IResponseObj) => {
		return {
			success: true,
			status,
			data,
		};
	},
	/**
	 * {status, message}
	 * 실패시 응답 메세지를 포함한 객체를 생성합니다
	 */
	alert: ({ status, message }: IResponseObj) => {
		return { success: false, status, message };
	},
	/**
	 * {status, error}
	 * 실패시 에러를 포함한 객체를 생성합니다
	 */
	failed: ({ status, error }: IResponseObj) => {
		return {
			success: false,
			status,
			error: error.toString(),
		};
	},
};
