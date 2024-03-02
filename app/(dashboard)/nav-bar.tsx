import { BarChartIcon, ChatBubbleIcon, GearIcon, FileTextIcon } from "@radix-ui/react-icons"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import Image from "next/image"
import Logo from "@/assets/logo.svg"

export default function NavBar() {
  return (
    <nav className="z-10 border-[1px] border-gray-200 p-4 absolute bottom-0 w-screen md:w-14 md:h-screen">
      <TooltipProvider>
        <ul className="h-full w-full flex md:flex-col gap-8 justify-center items-center">
          <Image src={Logo} alt="logo" className="hidden md:block" />
          <li>
            <Tooltip>
              <TooltipTrigger>
                <FileTextIcon width={20} height={20} />
              </TooltipTrigger>
              <TooltipContent side="right">
                <p>Journals</p>
              </TooltipContent>
            </Tooltip>
          </li>
          <li>
            <Tooltip>
              <TooltipTrigger>
                <BarChartIcon width={20} height={20} />
              </TooltipTrigger>
              <TooltipContent side="right">
                <p>Statistics</p>
              </TooltipContent>
            </Tooltip>
          </li>
          <li>
            <Tooltip>
              <TooltipTrigger>
                <ChatBubbleIcon width={20} height={20} />
              </TooltipTrigger>
              <TooltipContent side="right">
                <p>Chat</p>
              </TooltipContent>
            </Tooltip>
          </li>
          <li className="md:mt-auto">
            <Tooltip>
              <TooltipTrigger>
                <GearIcon width={20} height={20} />
              </TooltipTrigger>
              <TooltipContent side="right">
                <p>Settings</p>
              </TooltipContent>
            </Tooltip>
          </li>
        </ul>
      </TooltipProvider>
    </nav >
  )
}
