import {useCallback, useEffect, useRef, useState} from "react";

import {fetchWaitlistCount} from "../api/waitlist";

export type WaitlistCountState = {status: "loading"} | {status: "ready"; total: number} | {status: "unavailable"};

/**
 * Live signup total for the hero's social-proof line, plus a `refresh` to call
 * after a successful signup so the figure doesn't sit one behind.
 *
 * "Loading" and "failed" are separate states on purpose: a single null would
 * force callers to render a static placeholder while the request is still in
 * flight, which then visibly snaps to a different number — reading as though the
 * first figure was made up. Callers show a skeleton for `loading` and drop the
 * line entirely for `unavailable`.
 *
 * Fetched in an effect rather than during render so the prerendered HTML has no
 * count baked in and hydration stays stable.
 */
export function useWaitlistCount(): {
  state: WaitlistCountState;
  refresh: () => void;
} {
  const [state, setState] = useState<WaitlistCountState>({status: "loading"});
  // Guards against setting state after unmount, including from a refresh that
  // is still in flight when the component goes away.
  const activeRef = useRef(true);

  useEffect(() => {
    activeRef.current = true;
    return () => {
      activeRef.current = false;
    };
  }, []);

  const load = useCallback(() => {
    void fetchWaitlistCount().then((total) => {
      if (!activeRef.current) return;
      setState(total === null ? {status: "unavailable"} : {status: "ready", total});
    });
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  return {state, refresh: load};
}
