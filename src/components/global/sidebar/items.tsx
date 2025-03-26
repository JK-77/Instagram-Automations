import { SIDEBAR_MENU } from '@/constants/menu'
import ViewReview from '@/icons/ViewReview'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import React from 'react'

type Props = {
  page: string
  slug: string
}

const Items = ({ page, slug }: Props) => {
  return (
    <div>
      {SIDEBAR_MENU.map((item) => (
        <Link
          key={item.id}
          href={`/dashboard/${slug}/${item.label === 'home' ? '/' : item.label}`}
          className={cn(
            'capitalize flex gap-x-2 rounded-full p-3 hover:text-white transition',
            page === item.label && 'bg-[#0f0f0f]',
            page === slug && item.label === 'home'
              ? 'bg-[#0f0f0f]'
              : 'text-[#9B9CA0]'
          )}
        >
          {item.icon}
          {item.label}
        </Link>
      ))}

      {/* Add Button at the End */}
      <Link href="http://localhost:3000/api/checkmyreviews">
  <button className="flex items-center gap-3 px-3 py-2 text-[#9B9CA0] hover:text-white transition">
    <ViewReview /> {/* Your Icon Component */}
    <span className="text-md">Analytics</span>
  </button>
</Link>

    </div>
  );
};

export default Items;
