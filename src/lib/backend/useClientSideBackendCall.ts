import { useEffect, useState } from "react";
import { backend } from "./clientsideBackend";

/**
 * Performs a backend call on the client side. Returns the value and a trigger to re-fetch if you enabled manual triggering.
 * Make sure to set "use client" when you want to use this
 */
export function useClientSideBackendCall<
  SuccessReturn,
  Error,
  TriggerManually extends boolean = false,
>(
  apiCall: (arg: typeof backend) => () => Promise<{
    data: SuccessReturn | null;
    error: Error | null;
  }>,
  triggerManually?: TriggerManually,
) {
  const [value, setValue] = useState<SuccessReturn>();
  const [pending, setPending] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(true);

  const trigger = async () => {
    setLoading(true);
    const response = await apiCall(backend)();
    //TODO we could do some actual error handling instead of just throwing
    if (response.error) {
      throw new Error(JSON.stringify(response.error));
    }
    if (response.data === null) {
      throw new Error("Invalid state: Response data is null");
    }
    setPending(false);
    setLoading(false);
    setValue(response.data as SuccessReturn);
  };

  // biome-ignore lint/correctness/useExhaustiveDependencies: we want this to only run once when the component mounts
  useEffect(() => {
    if (!triggerManually) {
      trigger();
    }
  }, []);

  return {
    value: value as SuccessReturn,
    pending,
    loading,
    trigger: triggerManually ? trigger : undefined,
  } as
    | {
        /**
         * Whether the backend call is pending. This is false as soon as value is populated
         */
        pending: true;
        /**
         * The value of the backend call
         */
        value: undefined;
        /**
         * Whether the backend call is loading. Can become true again even if the value is populated when the backend call is triggered manually
         */
        loading: boolean;
        /**
         * Triggers the backend call
         */
        trigger: TriggerManually extends true ? () => Promise<void> : undefined;
      }
    | {
        /**
         * Whether the backend call is pending. This is false as soon as value is populated
         */
        pending: false;
        /**
         * The value of the backend call
         */
        value: SuccessReturn;
        /**
         * Whether the backend call is loading. Can become true again even if the value is populated when the backend call is triggered manually
         */
        loading: boolean;
        /**
         * Triggers the backend call
         */
        trigger: TriggerManually extends true ? () => Promise<void> : undefined;
      };
}

/**
 * Repetetively calls the backend for something fromt the client. Returns the value and a trigger to re-fetch manually.
 */
export function useClientSideBackendCallPoller<SuccessReturn, Error>(
  apiCall: (arg: typeof backend) => () => Promise<{
    data: SuccessReturn | null;
    error: Error | null;
  }>,
  intervalDuration = 5000,
) {
  const r = useClientSideBackendCall(apiCall, true);

  // biome-ignore lint/correctness/useExhaustiveDependencies: we want this to only run once when the component mounts
  useEffect(() => {
    r.trigger();
    const interval = setInterval(r.trigger, intervalDuration);
    return () => clearInterval(interval);
  }, []);

  return r;
}
