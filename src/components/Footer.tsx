"use client"
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { FaGithub, FaInstagram, FaLinkedin } from 'react-icons/fa'
import logo from "../../public/images/logo.webp"
import { navMenu } from './Navbar'
import { usePathname } from 'next/navigation'
const Footer = () => {
    const pathname = usePathname()
    return (
        <>
            <footer className='pt-8  mt-14 flex flex-col items-center justify-center w-full  border-t  px-4 sm:px-6'>
                <div className={`" grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10  w-full ${pathname.startsWith("/admin") && "hidden"}"`}>
                    <div className=" col-span-1 flex flex-col items-start justify-start gap-3">
                        <Link href="/" className="flex items-start gap-2 ">
                            <Image src={logo} alt="Logo" className=" w-[30px] h-[30px] rounded-md " />
                        </Link>
                        <p className="  text-base font-medium text-gray-600 dark:text-gray-300 text-start w-full  ">
                            As a full-stack developer, I specialize in transforming creative
                            ideas into innovative web applications. With a touch of pixel magic,
                            I craft visually stunning and responsive websites.
                        </p>
                    </div>
                    <div className=" col-span-1 flex flex-col items-start sm:items-end lg:items-center justify-start">
                        <h4 className="text-xl font-bold mb-4   theme-gradient-text">Connect with me</h4>
                        <div className="flex items-center space-x-4">
                            <Link
                                href="https://instagram.com/ashmin_sharma_"
                                aria-label="Insta"
                                target="_blank"
                            >
                                <FaInstagram size={23} />
                            </Link>
                            <Link
                                href="https://github.com/Ashwin201"
                                aria-label="Github"
                                target="_blank"
                            >
                                <FaGithub size={23} />
                            </Link>
                            <Link
                                href="https://www.linkedin.com/in/ashmin-sharma-6a4867257"
                                aria-label="Linkedin"
                                target="_blank"
                            >
                                <FaLinkedin size={23} />
                            </Link>
                        </div>
                    </div>
                    <div className=" col-span-1 flex flex-col text-start lg:items-end justify-center">
                        <h4 className="text-xl font-bold mb-4   theme-gradient-text">Quick Links</h4>
                        <div className="flex flex-col space-y-2">
                            {
                                navMenu?.map((navItem) => (
                                    <Link
                                        key={navItem?.id}
                                        href={`#${navItem?.href}`}
                                        className="text-muted-foreground transition-colors hover:text-foreground dark:text-gray-300 text-gray-600 text-base lg:text-end font-medium "
                                        aria-label='Path Names'
                                    >
                                        {navItem?.pathName}
                                    </Link>
                                ))
                            }
                        </div>
                    </div>
                    <p className="   my-3  sm:col-span-2 lg:col-span-3  px-3 sm:px-8 text-base text-center font-medium text-gray-600 dark:text-gray-300">&copy; 2023 Ashmin Sharma. All rights reserved.</p>
                </div>
            </footer>
        </>
    )
}

export default Footer