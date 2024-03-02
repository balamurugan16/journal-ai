import Image from "next/image"
import Logo from "@/assets/logo.svg"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"

export default function Header() {
  return (
    <header className="md:ml-14 px-4 h-14 border-b flex items-center justify-between">
      <div className="flex gap-2 items-center">
        <Image src={Logo} width={24} alt="logo" className="block md:hidden" />
        <h1 className="text-2xl font-medium">Journal.ai</h1>
      </div>
      <Avatar>
        <AvatarImage width={24} src="https://github.com/balamurugan16.png" alt="@shadcn" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
    </header>
  )
}
