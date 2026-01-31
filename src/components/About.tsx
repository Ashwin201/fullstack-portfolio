"use client"
import Link from 'next/link'
import React, { Fragment, useEffect, useState } from 'react'
import { FaGithub, FaInstagram, FaLinkedin } from 'react-icons/fa'
import { IoIosMailUnread } from "react-icons/io";
import { Button } from './ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Building2Icon, CircleUser, FolderDown } from 'lucide-react';
import { Skeleton } from './ui/skeleton';
import ExperienceSkeleton from './Skeletons/ExperienceSkeleton';
import { useAbout } from '@/context/AboutProvider';
import dynamic from 'next/dynamic';
import AnimateOnVisible from './Animations';

const About = () => {
    const [data, setData] = useState<any>([]);
    const [loading, setLoading] = useState(true)
    const { userData, loader } = useAbout();
    // console.log(userData)
    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch(`/api/experience`, {
                    headers: {
                        "Content-Type": "application/json",
                    },
                });
                if (res.ok) {
                    const response = await res.json();
                    // console.log(response)
                    setData(response);
                    setLoading(false)
                }
            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
    }, []);
    return (
        <div id='about' className=' mt-6 pt-10 flex flex-col w-full justify-start items-start'>
            <div className=' mb-12  '>
                <h3 className=" text-4xl sm:text-[44px] mb-3  font-bold    theme-gradient-text">
                    Who I Am
                </h3>
                <p className=' text-base text-gray-600 font-medium dark:text-gray-300 '>
                    Get to know me in a more detailed & insightful way.
                </p>
            </div>
            <div className="  col-span-2  flex flex-col justify-start xl:-mt-3 align-start   mb-16  ">
                {/* <PlayerWithNoSSR
                    autoplay
                    loop
                    src={`/developer.json`}

                    className={` ml-5 min-[450px]:-ml-5 h-[300px] w-auto flex w items-center `}
                /> */}
                <AnimateOnVisible animation={"slideUp"} duration={0.9} className="font-bold text-[28px]  theme-gradient-text">
                    {userData?.role ? userData?.role : " Full Stack Developer"}
                </AnimateOnVisible>
                <div className="mt-6 text-base text-gray-600 dark:text-gray-300  font-medium ">
                    {userData?.desc ? userData?.desc?.map((description: any, index: number) => (
                        <AnimateOnVisible animation={"slideUp"} duration={1.0} key={index} className=' text-gray-600 dark:text-gray-300 text-base font-medium'>
                            {description}
                        </AnimateOnVisible>
                    )) : (
                        <>
                            <AnimateOnVisible animation={"slideUp"} duration={1.0} className=' text-gray-600 dark:text-gray-300 text-base font-medium'>
                                Hi, I&apos;m Ashmin Sharma, a web developer proficient in front-end technologies, and good in back-end technologies as well. With expertise in frameworks like Nextjs ,
                                I specialize in crafting visually appealing and responsive websites that prioritize a seamless user experience. My skills extend to database management with MongoDB,
                                ensuring robust back-end support for web applications. Efficeint in version control with Git and collaborating effectively within teams.
                            </AnimateOnVisible>
                            <AnimateOnVisible animation={"slideUp"} duration={1.0} className=' text-gray-600 dark:text-gray-300 text-base font-medium'>
                                Explore my portfolio to witness my commitment to turning ideas into functional, innovative, and user-centric web solutions.
                                Let&apos;s connect and discuss how I can bring your digital vision to life!
                            </AnimateOnVisible>
                        </>
                    )}

                </div>

                <AnimateOnVisible animation={"slideUp"} duration={1.0} className=" flex  my-6">
                    <Link
                        href="https://instagram.com/ashmin_sharma_"
                        className="mr-3"
                        aria-label="Instagram"
                        target="_blank"
                    >
                        <FaInstagram size={25} />
                    </Link>
                    <Link
                        href="https://github.com/Ashwin201"
                        className="mr-3"
                        aria-label="Github"
                        target="_blank"
                    >
                        <FaGithub size={25} />
                    </Link>
                    <Link
                        href="https://www.linkedin.com/in/ashmin-sharma-6a4867257"
                        className="mr-3"
                        aria-label="Linkedin"
                        target="_blank"
                    >
                        <FaLinkedin size={25} />
                    </Link>
                </AnimateOnVisible>
                <div className="flex">
                    <AnimateOnVisible animation={"slideUp"} duration={0.8} className="flex max-[360px]:flex-col-reverse flex-row font-medium max-[300px]:flex-col gap-4 ">

                        <Button>
                            <Link
                                target="_blank"
                                aria-label="Resume"
                                href={`${userData?.resume}`}
                                className=" flex items-center gap-2  text-center justify-center   py-[6px] w-fit max-[360px]:w-full  px-2 sm:px-4 text-sm "
                            >
                                <FolderDown size={22} />  Download CV
                                {/* <span className="ml-2">
                    <RiFolderDownloadFill size={25} className="" />
                </span> */}
                            </Link>
                        </Button>
                        <Button variant={"secondary"}
                        >
                            <Link
                                href={"mailto:ashminsharma203@gmail.com"}
                                aria-label="Contact"
                                className="flex items-center gap-2 justify-center py-[6px] w-fit max-[360px]:w-full    px-2 sm:px-4 text-sm "
                            >
                                <CircleUser size={22} />  Get in Touch
                            </Link>
                        </Button>
                    </AnimateOnVisible>
                </div>
            </div>


            <div className=' flex flex-col justify-start items-start outline-none border-none focus:outline-none hover:border-none focus:border-none  pt-3'>
                <div className=' mb-12  '>
                    <h4 className=" font-bold text-[28px]   mb-2  theme-gradient-text">
                        Education
                    </h4>
                    <p className=' text-base text-gray-600 font-medium dark:text-gray-300 '>
                        Discover my academic journey and the foundation of my expertise.
                    </p>
                </div>
                <div className="flex flex-col text-start px-4  ">
                    <div className=" border-l-[3px] border-gray-600 dark:border-gray-400   ">
                        <div className=" relative ml-[30px] sm:ml-[65px] mb-16 mt-[-2px]">
                            <AnimateOnVisible animation={"slideUp"} duration={0.9} className="  font-bold text-[28px]   theme-gradient-text mb-3 mt-[-2px]">
                                Bachelor&apos;s Degree
                            </AnimateOnVisible>
                            <AnimateOnVisible animation={"slideUp"} duration={1.0} className="  text-xl mb-3 font-bold text-gray-600 dark:text-gray-300">2021-2025</AnimateOnVisible>
                            <AnimateOnVisible animation={"slideUp"} duration={1.0} className=" flex items-start gap-1 font-medium dark:text-gray-300 text-gray-600  text-base">
                                I completed my Bachelor&apos;s degree in Computer Science and Engineering from Ganga Institute of Technology and Management, located in Kablana, Jhajjar.
                            </AnimateOnVisible>

                            <span className=" absolute top-0 left-0  flex justify-center align-middle items-center  w-[25px] p-1 h-[25px]  sm:w-[28px] sm:h-[28px] bg-white
                                 dark:bg-gray-900  border-gray-600 dark:border-gray-400  border-[3px] -ml-[45px] sm:-ml-[81px] rounded-[50%]">
                                <span className="w-[10px] h-[10px] sm:w-[15px] sm:h-[15px] bg-gray-600 dark:bg-gray-400  rounded-[50%]"></span>
                            </span>
                        </div>
                        <div className=" relative ml-[30px] sm:ml-[65px] ">
                            <AnimateOnVisible animation={"slideUp"} duration={0.9} className="  font-bold text-[28px]   theme-gradient-text  mb-3">
                                High School
                            </AnimateOnVisible>
                            <AnimateOnVisible animation={"slideUp"} duration={1.0} className="  text-xl mb-3 font-bold text-gray-600 dark:text-gray-300">2019-2021</AnimateOnVisible>
                            <AnimateOnVisible animation={"slideUp"} duration={1.0} className=" flex items-start gap-1 font-medium dark:text-gray-300 text-gray-600  text-base">
                                I accomplished my high school education at Government
                                Senior Secondary School, Jhajjar, Haryana, specializing in the
                                Non-Medical Stream, during the academic session of 2019-2021.
                            </AnimateOnVisible>
                            <span className=" absolute top-0 left-0  flex justify-center align-middle items-center  w-[25px] p-1 h-[25px]  sm:w-[28px] sm:h-[28px] bg-white dark:bg-gray-900  border-gray-600 dark:border-gray-400  border-[3px] -ml-[45px] sm:-ml-[81px] rounded-[50%]">
                                <span className="w-[10px] h-[10px] sm:w-[15px] sm:h-[15px] bg-gray-600 dark:bg-gray-400  rounded-[50%]"></span>
                            </span>
                        </div>

                    </div>
                </div>
            </div>

            <br />
            <br />
            <br />
            <div className=' flex w-full flex-col justify-start items-start outline-none border-none focus:outline-none hover:border-none focus:border-none  pt-3'>
                <div className=' mb-12  '>
                    <h4 className=" font-bold text-[28px]   mb-2  theme-gradient-text">
                        Experience
                    </h4>
                    <p className=' text-base text-gray-600 font-medium dark:text-gray-300 '>
                        Explore my professional background and the impact of my work.
                    </p>
                </div>

                {
                    loading ? (
                        <ExperienceSkeleton />
                    ) : (

                        data?.map((item: any, index: number) => (
                            <div key={index} className="flex flex-col justify-start items-start text-start px-4   ">
                                <div className=" border-l-[3px] border-gray-600 dark:border-gray-400 flex flex-col gap-16   ">

                                    <div className={`relative ml-[30px] sm:ml-[65px] ${index < data?.length - 1 && "pb-4"}`}>
                                        <div className=' flex gap-4 items-start mb-1'>
                                            {
                                                item?.image ?
                                                    <img
                                                        src={item?.image}
                                                        alt="Image"
                                                        width={25}
                                                        height={25}
                                                        className=" w-16 h-12  object-contain object-center"
                                                    />
                                                    :
                                                    <Building2Icon className=" text-gray-900 dark:text-gray-100" size={25} />
                                            }
                                            <div className=' flex flex-col'>
                                                {item?.company &&
                                                    <AnimateOnVisible animation={"slideRight"} duration={1.0} className="  font-bold text-xl theme-gradient-text ">
                                                        {item?.company}
                                                    </AnimateOnVisible>
                                                }
                                                <AnimateOnVisible animation={"slideRight"} duration={1.0} className="  text-sm mb-2 font-semibold">
                                                    {item?.duration}
                                                </AnimateOnVisible>
                                            </div>

                                        </div>
                                        <AnimateOnVisible animation={"slideUp"} duration={0.9} className="  font-bold text-2xl  theme-gradient-text   mb-4">
                                            {item?.role}
                                        </AnimateOnVisible>

                                        <div className={`${index <= data?.length - 2 && " mb-8"}`}>
                                            {item?.description?.map((desc: any, index: number) => {
                                                return (
                                                    <AnimateOnVisible animation={"slideUp"} duration={0.8} key={index} className="font-medium  text-gray-600 dark:text-gray-300">
                                                        {desc}
                                                    </AnimateOnVisible>
                                                )
                                            })}
                                        </div>
                                        <span className=" absolute top-0 left-0  flex justify-center align-middle items-center  w-[25px] p-1 h-[25px]  sm:w-[28px] sm:h-[28px]
                     bg-white dark:bg-gray-900  border-gray-600 dark:border-gray-400  border-[3px] -ml-[45px] sm:-ml-[81px] rounded-[50%]">
                                            <span className="w-[10px] h-[10px] sm:w-[15px] sm:h-[15px] bg-gray-600 dark:bg-gray-400  rounded-[50%]"></span>
                                        </span>
                                    </div>

                                </div>
                            </div>
                        ))
                    )
                }
            </div>
            <br />
            <br />
            <br />
        </div>
    )
}

export default About
const PlayerWithNoSSR = dynamic(
    () => import('@lottiefiles/react-lottie-player').then(module => module.Player),
    { ssr: false }
);