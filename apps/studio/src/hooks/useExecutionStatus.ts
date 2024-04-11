import { useAuth } from "@clerk/clerk-react";
import { useEffect, useState } from "react";
import getExecutionStatus, {
	GetExecutionStatusResponse,
} from "~/api/getExecutionStatus";

export const useExecutionStatus = (
	executionId: string | null,
): GetExecutionStatusResponse | null => {
	const [executionStatus, setExecutionStatus] =
		useState<GetExecutionStatusResponse>({
			status: "idle",
			statusMessage: "Not started",
		});

	const { getToken } = useAuth();

	useEffect(() => {
		const handler = async () => {
			if (!executionId) {
				return;
			}

			const token = await getToken();

			if (token === null) {
				return;
			}

			const executionStatusOrError = await getExecutionStatus({
				executionId,
				token,
			});

			if (executionStatusOrError.isLeft()) {
				console.error(executionStatusOrError.getLeft());
			} else {
				setExecutionStatus(executionStatusOrError.get());
			}
		};
		handler();
	}, [executionId, getToken]);

	return executionStatus;
};
