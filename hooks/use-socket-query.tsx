import { useEffect, useMemo } from "react";
import {
  useQuery,
  useQueryClient,
  UseQueryOptions,
  QueryKey,
} from "@tanstack/react-query";
import { Socket } from "socket.io-client";

export function useSocketQuery<
  TQueryFnData = unknown,
  TError = unknown,
  TData = TQueryFnData
>(
  eventName: string,
  socket: Socket,
  options?: UseQueryOptions<TQueryFnData, TError, TData>
) {
  const queryClient = useQueryClient();
  const namespace = socket["nsp"];
  const queryKey = useMemo(
    () => [namespace, eventName],
    [namespace, eventName]
  );

  useEffect(() => {
    if (socket.io._readyState === "closed") socket.connect();
    if (socket.hasListeners(eventName)) return;

    socket.on(eventName, (data: TData) => {
      queryClient.setQueryData(queryKey, data);
    });

    socket.on("connect_error", async (error) => {
      await queryClient.cancelQueries(queryKey, { exact: true });
      await queryClient.prefetchQuery(queryKey, () => {
        throw new Error(`Connection failed: ${error.message}`);
      });
    });

    socket.on("disconnect", async (reason) => {
      await queryClient.prefetchQuery(queryKey, () => {
        throw new Error(`Disconnection occurred: ${reason}`);
      });
    });

    return () => {
      socket.off();
      socket.disconnect();
    };
  }, [socket, eventName, queryClient, queryKey]);

  return useQuery<TQueryFnData, TError, TData>(
    queryKey as QueryKey,
    () => new Promise<TQueryFnData>(() => {}),
    {
      ...options,
      staleTime: Infinity,
    }
  );
}
