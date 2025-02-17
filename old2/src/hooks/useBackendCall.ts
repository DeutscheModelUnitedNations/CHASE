import { useEffect, useState } from "react";

/**
 * Performs a backend call. Returns the value and a trigger if you enabled manual triggering.
 */
export function useBackendCall<
  SuccessReturn,
  Error,
  TriggerManually extends boolean,
>(
  apiCall: () => Promise<{ data: SuccessReturn | null; error: Error | null }>,
  triggerManually: TriggerManually,
) {
  const [value, setValue] = useState<SuccessReturn>();

  const trigger = async () => {
    const response = await apiCall();
    //TODO we could do some actual error handling instead of just throwing
    if (response.error) {
      throw new Error(JSON.stringify(response.error));
    }
    if (response.data === null) {
      throw new Error("Invalid state: Response data is null");
    }
    setValue(response.data as SuccessReturn);
  };

  useEffect(() => {
    if (!triggerManually) {
      trigger();
    }
  }, []);

  return [
    value as SuccessReturn,
    (triggerManually ? trigger : undefined) as TriggerManually extends true
      ? () => Promise<void>
      : undefined,
  ] as const;
}
