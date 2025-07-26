// app/lib/swr/useStudents.ts
import { fetcher } from '@/libs/swr/fetcher';
import useSWR from 'swr';

export function useStudentsHooks() {
  const { data, error, isLoading, mutate } = useSWR('/students', fetcher);

  return {
    students: data,
    isLoading,
    isError: error,
    mutate,
  };
}
