import { Skeleton } from '@/components/ui/skeleton'

export default function SkeletonCard() {
  return (
    <div className="p-5 border rounded-xl bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700 shadow-sm space-y-3 animate-pulse">
      <Skeleton className="w-full h-[200px] rounded-lg" />
      <Skeleton className="h-4 w-5/6" />
      <Skeleton className="h-4 w-4/6" />
      <div className="flex justify-between items-center mt-2">
        <Skeleton className="h-10 w-32 rounded-full" />
        <Skeleton className="h-10 w-24 rounded-md" />
      </div>
    </div>
  )
}
