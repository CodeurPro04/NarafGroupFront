import React from "react";
export const SkeletonBlock = ({ className = "" }) => (
  <div className={`animate-pulse bg-gray-200 ${className}`}></div>
);
export const PropertyCardSkeleton = () => (
  <div className="bg-white shadow-lg overflow-hidden">
    {" "}
    <SkeletonBlock className="h-64 w-full" />{" "}
    <div className="p-6 space-y-4">
      {" "}
      <SkeletonBlock className="h-5 w-3/4" />{" "}
      <SkeletonBlock className="h-4 w-1/2" />{" "}
      <div className="grid grid-cols-3 gap-3">
        {" "}
        <SkeletonBlock className="h-10 w-full" />{" "}
        <SkeletonBlock className="h-10 w-full" />{" "}
        <SkeletonBlock className="h-10 w-full" />{" "}
      </div>{" "}
      <SkeletonBlock className="h-10 w-1/3" />{" "}
    </div>{" "}
  </div>
);
export const ListItemSkeleton = () => (
  <div className="bg-white shadow-lg overflow-hidden">
    {" "}
    <div className="flex flex-col md:flex-row">
      {" "}
      <SkeletonBlock className="h-56 md:h-auto md:w-1/3 w-full" />{" "}
      <div className="p-6 flex-1 space-y-4">
        {" "}
        <SkeletonBlock className="h-6 w-2/3" />{" "}
        <SkeletonBlock className="h-4 w-1/2" />{" "}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {" "}
          <SkeletonBlock className="h-10 w-full" />{" "}
          <SkeletonBlock className="h-10 w-full" />{" "}
          <SkeletonBlock className="h-10 w-full" />{" "}
          <SkeletonBlock className="h-10 w-full" />{" "}
        </div>{" "}
        <div className="flex gap-2">
          {" "}
          <SkeletonBlock className="h-6 w-24" />{" "}
          <SkeletonBlock className="h-6 w-20" />{" "}
          <SkeletonBlock className="h-6 w-16" />{" "}
        </div>{" "}
        <SkeletonBlock className="h-10 w-32" />{" "}
      </div>{" "}
    </div>{" "}
  </div>
);
