'use client'

import { ChevronDown } from 'lucide-react'

export type SortOption = {
  value: string
  label: string
}

interface SortSelectProps {
  value: string
  onChange: (value: string) => void
  options: SortOption[]
  className?: string
}

export default function SortSelect({ value, onChange, options, className = '' }: SortSelectProps) {
  return (
    <div className={`relative ${className}`}>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="appearance-none bg-white border-2 border-gray-200 rounded-xl px-4 py-3 pr-10 text-gray-900 font-medium focus:ring-2 focus:ring-[#f3d98c] focus:border-[#f3d98c] transition-all duration-300 hover:border-gray-300 cursor-pointer"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-500 pointer-events-none" />
    </div>
  )
}
