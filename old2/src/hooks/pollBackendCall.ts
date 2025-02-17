import { useEffect } from "react";
import { useBackendCall } from "./useBackendCall";

/**
 * Repetetively calls the backend for something. Returns the value and a trigger
 */
export function usePollBackendCall<SuccessReturn, Error>(
  apiCall: () => Promise<{ data: SuccessReturn | null; error: Error | null }>,
  intervalDuration = 5000
) {
  const [value, trigger] = useBackendCall(apiCall, true);

  useEffect(() => {
    trigger();
    const interval = setInterval(trigger, intervalDuration);
    return () => clearInterval(interval);
  }, []);

  return [value as SuccessReturn, trigger] as const;
}
