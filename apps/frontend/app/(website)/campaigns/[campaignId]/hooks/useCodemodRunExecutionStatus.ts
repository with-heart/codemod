import { GET_EXECUTION_STATUS } from "@mocks/endpoints/gh-run";
import { useAPI } from "@studio/hooks/useAPI";
import { useEffect, useState } from "react";

const DEFAULT_POLLING_INTERVAL = 1000;
const DEFAULT_POLLING_TIMEOUT = 1000 * 60 * 10;

type GetExecutionStatusResponse = Array<
  | {
      status: "queued" | "in_progress" | "errored";
      message: string;
    }
  | {
      status: "success";
      result: string;
    }
>;

export const useCodemodRunResult = (
  executionIds: string[],
  pollingInterval = DEFAULT_POLLING_INTERVAL,
): GetExecutionStatusResponse => {
  const [executionStatuses, setExecutionStatuses] =
    useState<GetExecutionStatusResponse>([]);

  const { get: getExecutionStatus } = useAPI<GetExecutionStatusResponse>(
    GET_EXECUTION_STATUS(executionIds),
  );

  useEffect(() => {
    if (executionIds.length === 0) {
      return;
    }

    let intervalId: number;

    const pollCodemodRunExecutionStatus = async () => {
      intervalId = window.setInterval(async () => {
        let response: GetExecutionStatusResponse | null = null;

        try {
          response = (await getExecutionStatus<GetExecutionStatusResponse>())
            .data;
        } catch (e) {
          clearInterval(intervalId);
          return;
        }

        setExecutionStatuses(response);

        const areAllCodemodsExecutedOrErrored = response.every(({ status }) =>
          ["success", "errored"].includes(status),
        );

        if (areAllCodemodsExecutedOrErrored) {
          clearInterval(intervalId);
        }
      }, pollingInterval);
    };

    pollCodemodRunExecutionStatus();

    return () => {
      clearInterval(intervalId);
    };

    // @TODO why
  }, [executionIds.join(",")]);

  return executionStatuses;
};