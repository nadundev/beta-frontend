"use client";

import React from 'react'
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"

const page = () => {
  const router = useRouter()

  return (
    <div className="w-full h-full flex justify-center items-center">
      <div className="max-w-md p-6 bg-white rounded-lg shadow-sm border border-dashed border-gray-300">
        <h2 className="text-xl font-semibold mb-4">Dashboard Under Development</h2>
        <p className="text-gray-600 mb-6">We're working hard to bring you an amazing dashboard experience. In the meantime, check out our Diet Planner!</p>
        <Button 
          onClick={() => router.push('/dietPlanner')}
        >
          Go to Diet Planner
        </Button>
      </div>
    </div>
  )
}

export default page