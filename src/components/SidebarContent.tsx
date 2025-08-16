import Image from "next/image"
import React from 'react'
import profilePic from "../../public/images/profile.jpg"
import Link from "next/link"
import { FaGithub, FaInstagram, FaLinkedin } from "react-icons/fa";
import { IoLocationSharp } from "react-icons/io5";
import { Button } from "./ui/button";
import { CircleUser, FolderDown } from "lucide-react";
import { useAbout } from "@/context/AboutProvider";
import AnimateOnVisible from "./Animations";
const SidebarContent = () => {
    const { userData, loader } = useAbout();
    // console.log(userData)

    return (
        <div className=' flex flex-col items-center justify-center gap-5'>
            <AnimateOnVisible animation={"zoomOut"} duration={0.8}>

                {loader || !userData?.profile ? (

                    <div className=" w-36 h-36 bg-gray-900 text-gray-50 dark:text-gray-900 font-semibold text-7xl pb-2 flex  justify-center items-center dark:bg-gray-50 rounded-full border-2 border-gray-400 dark:border-gray-900">
                        A
                    </div>
                ) : (
                    <Image src={`${userData?.profile}`} alt="Profile" width={200} height={200} className=" object-cover w-36 h-36 rounded-full border-4 border-gray-400 dark:border-gray-900" />
                )}
            </AnimateOnVisible>
            <AnimateOnVisible animation={"slideUp"} duration={0.9} className=" text-3xl font-bold text-center   theme-gradient-text">Ashmin Sharma</AnimateOnVisible>
            <AnimateOnVisible animation={"slideUp"} duration={1.0} className=" flex items-center gap-2 text-base font-semibold text-gray-600 dark:text-gray-300 justify-center sm:justify-start">
                <span>
                    <IoLocationSharp size={22} />
                </span>{" "}
                Haryana, India
            </AnimateOnVisible>

            <AnimateOnVisible animation={"slideUp"} duration={0.8} className="  text-base lg:text-[15px] font-medium text-gray-600 dark:text-gray-300 text-center px-2 md:px-16  lg:px-2">
                As a full-stack developer, I specialize in translating creative concepts into cutting-edge web applications.
                Leveraging my expertise in both front-end and back-end development, I deliver visually captivating and highly
                responsive websites that align with modern design principles and user experience standards.
            </AnimateOnVisible>

            <nav className=" flex items-center justify-center sm:justify-start mt-1">
                <Link
                    href="https://instagram.com/ashwin.203?igshid=YmMyMTA2M2Y="
                    className="mr-3 text-gray-900 dark:text-gray-300"
                    aria-label="Insta"
                    target="_blank"
                >
                    <FaInstagram size={25} />
                </Link>
                <Link
                    href="https://github.com/Ashwin201"
                    className="mr-3 text-gray-900 dark:text-gray-300"
                    aria-label="Github"
                    target="_blank"
                >
                    <FaGithub size={25} />
                </Link>
                <Link
                    href="https://www.linkedin.com/in/ashmin-sharma-6a4867257"
                    className="mr-3 text-gray-900 dark:text-gray-300"
                    aria-label="Linkedin"
                    target="_blank"
                >
                    <FaLinkedin size={25} />
                </Link>
            </nav>

            <div className=" flex justify-center items-center  flex-col min-[400px]:flex-row lg:flex-col  gap-3 mt-2 px-4 w-full">
                <Button variant={"outline"} className="w-full" >
                    <Link href={"mailto:ashminsharma203@gmail.com"} aria-label="Get In Touch" className="  flex items-center gap-2 text-base font-medium" >
                        <CircleUser size={22} /> Get In Touch
                    </Link>
                </Button>
                <Button className=" w-full"  >
                    <Link href={`${userData?.resume}`} aria-label="Download CV" className=" flex items-center gap-3 text-base font-medium" >
                        <FolderDown size={22} />  Download CV
                    </Link>
                </Button>

            </div>

        </div>
    )
}

export default SidebarContent
