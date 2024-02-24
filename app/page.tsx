import Calendar from "@/components/Calendar";
import Image from "next/image";

export default function Home({children}: {children: React.ReactNode}) {
  return (
    <>
      <Calendar />
    </>
  )
}
