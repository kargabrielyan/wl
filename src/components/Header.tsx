'use client'

import MobileHeader from './MobileHeader'
import DesktopHeader from './DesktopHeader'

export default function Header() {
  return (
    <>
      {/* Mobile Header - показывается на мобильных устройствах и планшетах */}
      <div className="lg:hidden">
        <MobileHeader />
      </div>
      
      {/* Desktop Header - показывается только на десктопе */}
      <div className="hidden lg:block">
        <DesktopHeader />
      </div>
    </>
  )
}