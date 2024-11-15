import {RefObject, useEffect, useRef} from "react";
import {loadMoreCompanies} from "../../../../entities/Company/model/companySlice";
import {useAppDispatch} from "../useAppDispatch/useAppDispatch";


export const UseInfiniteScroll = (triggerRef: RefObject<HTMLElement>) => {
  const dispatch = useAppDispatch();

  const observer = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    if (!triggerRef.current) return;

    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) {
        dispatch(loadMoreCompanies());
      }
    });

    observer.current.observe(triggerRef.current);
    return () => observer.current?.disconnect();
  }, [dispatch, triggerRef]);

  return [triggerRef]
};
