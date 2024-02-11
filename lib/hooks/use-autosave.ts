import { useEffect, useRef } from "react";
import useDebounce from "./use-debounce";

type Props<TData, TReturn> = {
  data: TData;
  onSave: (data: TData) => Promise<TReturn> | TReturn | void;
  interval?: number;
  saveOnUnmount?: boolean;
}

function useAutosave<TData, TReturn>({
  data,
  onSave,
  interval = 2000,
  saveOnUnmount = true
}: Props<TData, TReturn>) {
  const valueOnCleanup = useRef(data);
  const initialRender = useRef(true);
  const handleSave = useRef(onSave);

  const debouncedValueToSave = useDebounce(data, interval);

  useEffect(() => {
    if (initialRender.current) {
      initialRender.current = false;
    } else {
      handleSave.current(debouncedValueToSave);
    }
  }, [debouncedValueToSave]);

  useEffect(() => {
    valueOnCleanup.current = data;
  }, [data]);

  useEffect(() => {
    handleSave.current = onSave;
  }, [onSave]);

  useEffect(
    () => () => {
      if (saveOnUnmount) {
        handleSave.current(valueOnCleanup.current);
      }
    },
    [saveOnUnmount],
  );
}

export default useAutosave;

