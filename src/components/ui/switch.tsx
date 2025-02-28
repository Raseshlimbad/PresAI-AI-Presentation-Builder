// "use client"

// import * as React from "react"
// import * as SwitchPrimitives from "@radix-ui/react-switch"

// import { cn } from "@/lib/utils"

// const Switch = React.forwardRef<
//   React.ElementRef<typeof SwitchPrimitives.Root>,
//   React.ComponentPropsWithoutRef<typeof SwitchPrimitives.Root>
// >(({ className, ...props }, ref) => (
//   <SwitchPrimitives.Root
//     className={cn(
//       "peer inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=unchecked]:bg-input",
//       className
//     )}
//     {...props}
//     ref={ref}
//   >
//     <SwitchPrimitives.Thumb
//       className={cn(
//         "pointer-events-none block h-4 w-4 rounded-full bg-background shadow-lg ring-0 transition-transform data-[state=checked]:translate-x-4 data-[state=unchecked]:translate-x-0"
//       )}
//     />
//   </SwitchPrimitives.Root>
// ))
// Switch.displayName = SwitchPrimitives.Root.displayName

// export { Switch }

"use client"

import * as React from "react"
import * as SwitchPrimitives from "@radix-ui/react-switch"
import { Moon, Sun } from "lucide-react" // Import Sun & Moon icons
import { cn } from "@/lib/utils"

const Switch = React.forwardRef<
  React.ElementRef<typeof SwitchPrimitives.Root>,
  React.ComponentPropsWithoutRef<typeof SwitchPrimitives.Root>
>(({ className, ...props }, ref) => (
  <SwitchPrimitives.Root
    className={cn(
      "relative flex h-10 w-20 items-center rounded-full bg-gray-300 p-1 transition-colors dark:bg-[#262626]",
      className
    )}
    {...props}
    ref={ref}
  >
    {/* Sun Icon (Light Mode) */}
    <div className="absolute left-2 flex h-6 w-6 items-center justify-center">
      <Sun className="h-5 w-5 text-gray-500 transition-all data-[state=checked]:opacity-100 data-[state=unchecked]:opacity-50" />
    </div>

    {/* Moon Icon (Dark Mode) */}
    <div className="absolute right-2 flex h-6 w-6 items-center justify-center">
      <Moon className="h-5 w-5 text-gray-500 transition-all data-[state=checked]:opacity-50 data-[state=unchecked]:opacity-100" />
    </div>

    {/* Toggle Button (Thumb) */}
    <SwitchPrimitives.Thumb
      className={cn(
        "absolute flex h-8 w-8 items-center justify-center rounded-full bg-white shadow-md transition-transform data-[state=checked]:translate-x-[0] data-[state=unchecked]:translate-x-[40px] dark:bg-gray-950"
      )}
    />
  </SwitchPrimitives.Root>
))
Switch.displayName = SwitchPrimitives.Root.displayName

export { Switch }

