import Link from "next/link"
import Sidebar from "./SidebarContent"
import Image from "next/image"
import { RxCross2 } from "react-icons/rx";
import profilePic from "../../public/images/profile.jpg"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "./ui/button"
import { useAbout } from "@/context/AboutProvider";
import { useEffect, useState } from "react";

const MobileSidebar = () => {
    const { userData, loader } = useAbout();
    const [width, setWidth] = useState(window.innerWidth);

    useEffect(() => {
        const handleResize = () => setWidth(window.innerWidth);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);


    return (
        <>
            <div className=" flex items-center gap-3   ">

                <Dialog>
                    <DialogTrigger>
                        {loader || !userData?.profile ? (
                            <div className=" w-9 h-9 bg-gray-900 text-gray-50 dark:text-gray-900 font-semibold text-base flex  justify-center items-center
                             dark:bg-gray-50 rounded-full border-2 border-gray-200 dark:border-gray-900">
                                A
                            </div>
                        ) : (
                            <Image src={`${userData?.profile}`} width={36} height={36} alt="Profile Picture" className=" object-cover  w-[33px] h-[33px] 
                            rounded-full border-2 border-gray-200 dark:border-gray-900" />
                        )}
                    </DialogTrigger>
                    <DialogContent className={`dark:bg-gradient-to-t dark:from-zinc-900 dark:to-gray-950 w-full h-fit flex flex-col justify-center items-center   bg-gradient-to-t  from-white to-slate-50`}>
                                    <Sidebar />
                    </DialogContent>
                </Dialog>

            </div>


        </>
    )
}

export default MobileSidebar