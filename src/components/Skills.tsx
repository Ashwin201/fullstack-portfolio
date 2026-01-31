import React from "react";
import Image from "next/image";
import redux from "../../public/images/redux.webp";
import zustand from "../../public/images/zustand-removebg-preview.webp";
import shadcn from "../../public/images/shadcn-removebg-preview.webp";
import zod from "../../public/images/zod-removebg-preview.webp";
import expressjs from "../../public/images/express-js-removebg-preview.webp";
import Stripe from "../../public/images/Stripe.webp";
import git from "../../public/images/git.webp";
import github from "../../public/images/github.webp";
import docker from "../../public/images/docker-removebg-preview.webp";
import postman from "../../public/images/postman-removebg-preview.webp";
import { Cpp, Java } from "../../public/SkillIcons";
import aws from "../../public/images/aws.svg";
import {
    // FireBase,
    MongoDb,
    NextJs,
    Nodejs,
    Prisma,
    Bootstrap,
    Css,
    Html,
    Js,
    Reactjs,
    Tailwind,
} from "../../public/SkillIcons";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import AnimateOnVisible from "./Animations";

const Skills = () => {
    return (
        <div id="skills" className=' pt-10 mt-6  flex flex-col w-full'>
            <div className=' mb-14  '>
                <h3 className=" text-4xl sm:text-[44px] mb-3  font-bold    theme-gradient-text">
                    Skills I Have
                </h3>
                <p className=' text-base text-gray-600 font-medium dark:text-gray-300 '>
                    Know what i have learned over the time.
                </p>
            </div>

            <div className="flex flex-col lg:flex-row justify-center align-middle lg:justify-between pb-10 mb-10 border-b-2 border-gray-200 dark:border-gray-900 ">
                <h4 className="   theme-gradient-text font-bold text-[28px]    mb-10 lg:mb-0 xl:mr-60">
                    Frontend Development
                </h4>
                <div className="grid grid-cols-3 sm:grid-cols-5 lg:grid-cols-4 align-content-end gap-10 lg:gap-10 xl:gap-14">
                    <AnimateOnVisible animation={"fade"} duration={1.0} className=" flex flex-col items-center ">
                        <div className="rounded-[50%] w-[50px] h-[50px] shadow-lg p-[6px]  flex justify-center items-center">
                            <Html />
                        </div>
                        <span className="  font-semibold mt-2 text-text1  text-[12.5px] text-center">
                            Html
                        </span>
                    </AnimateOnVisible>
                    <AnimateOnVisible animation={"fade"} duration={1.0} className=" flex flex-col items-center ">
                        <div className="rounded-[50%] w-[50px] h-[50px] shadow-lg p-[6px]  flex justify-center items-center">
                            <Css />
                        </div>
                        <span className="  font-semibold mt-2 text-text1  text-[12.5px] text-center">
                            Css
                        </span>
                    </AnimateOnVisible>
                    <AnimateOnVisible animation={"fade"} duration={1.0} className=" flex flex-col items-center ">
                        <div className="rounded-[50%] w-[50px] h-[50px] shadow-lg p-[6px]  flex justify-center items-center">
                            <Js />
                        </div>
                        <span className="  font-semibold mt-2 text-text1  text-[12.5px] text-center">
                            Javascript
                        </span>
                    </AnimateOnVisible>
                    <AnimateOnVisible animation={"fade"} duration={1.0} className=" flex flex-col items-center ">
                        <div className="rounded-[50%] w-[50px] h-[50px] shadow-lg p-3  flex justify-center items-center">
                            <Reactjs />
                        </div>
                        <span className="  font-semibold mt-2 text-text1  text-[12.5px] text-center">
                            React
                        </span>
                    </AnimateOnVisible>
                    <AnimateOnVisible animation={"fade"} duration={1.0} className=" flex flex-col items-center ">
                        <div className="rounded-[50%] w-[50px] h-[50px] shadow-lg p-[6px]  flex justify-center items-center">
                            <NextJs />
                        </div>
                        <span className="  font-semibold mt-2 text-text1  text-[12.5px] text-center">
                            Nextjs
                        </span>
                    </AnimateOnVisible>
                    <AnimateOnVisible animation={"fade"} duration={1.0} className=" flex flex-col items-center ">
                        <div className="rounded-[50%] w-[50px] h-[50px] shadow-lg p-[6px]  flex justify-center items-center">
                            <Bootstrap />
                        </div>
                        <span className="  font-semibold mt-2 text-text1  text-[12.5px] text-center">
                            Bootstrap
                        </span>
                    </AnimateOnVisible>
                    <AnimateOnVisible animation={"fade"} duration={1.0} className=" flex flex-col items-center ">
                        <div className="rounded-[50%] w-[50px] h-[50px] shadow-lg p-[6px]  flex justify-center items-center">
                            <Tailwind />
                        </div>
                        <span className="  font-semibold mt-2 text-text1  text-[12.5px] text-center">
                            Tailwind
                        </span>
                    </AnimateOnVisible>
                    <AnimateOnVisible animation={"fade"} duration={1.0} className=" flex flex-col items-center ">
                        <div className="rounded-[50%] w-[50px] h-[50px] shadow-lg p-[6px]  flex justify-center items-center">
                            <Image src={shadcn} alt="shadcn " className="w-[90px] " />
                        </div>
                        <span className="  font-semibold mt-2 text-text1  text-[12.5px] text-center">
                            Shadcn UI
                        </span>
                    </AnimateOnVisible>
                    <AnimateOnVisible animation={"fade"} duration={1.0} className=" flex flex-col items-center ">
                        <div className="rounded-[50%] w-[50px] h-[50px] shadow-lg p-3  flex justify-center items-center">
                            <Image src={redux} alt="Redux Toolkit " className="w-[90px] " />
                        </div>
                        <span className="  font-semibold mt-2 text-text1  text-[12.5px] text-center">
                            Redux <br /> Toolkit
                        </span>
                    </AnimateOnVisible>
                    <AnimateOnVisible animation={"fade"} duration={1.0} className=" flex flex-col items-center ">
                        <div className="rounded-[50%] w-[50px] h-[50px] shadow-lg  flex justify-center items-center">
                            <Image src={zustand} alt="Zustand" className="w-[90px] h-auto " />
                        </div>
                        <span className="  font-semibold mt-2 text-text1  text-[12.5px] text-center">
                            Zustand
                        </span>
                    </AnimateOnVisible>
                    <AnimateOnVisible animation={"fade"} duration={1.0} className=" flex flex-col items-center ">
                        <div className="rounded-[50%] w-[50px] h-[50px] shadow-lg p-[6px]  flex justify-center items-center">
                            <Image src={zod} alt="zod" className="w-[90px] " />
                        </div>
                        <span className="  font-semibold mt-2 text-text1  text-[12.5px] text-center">
                            Zod
                        </span>
                    </AnimateOnVisible>
                    <AnimateOnVisible animation={"fade"} duration={1.0} className=" flex flex-col items-center ">
                        <div className="rounded-[50%] w-[50px] h-[50px] shadow-lg p-3  flex justify-center items-center">
                            <Reactjs />
                        </div>
                        <span className="  font-semibold mt-2 text-text1  text-[12.5px] text-center">
                            React Native
                        </span>
                    </AnimateOnVisible>
                </div>
            </div>
            <div className="flex flex-col lg:flex-row justify-center align-middle lg:justify-between  pb-10 mb-10 border-b-2 border-gray-200 dark:border-gray-900 ">
                <h4 className="   theme-gradient-text font-bold text-[28px]    mb-10 lg:mb-0 xl:mr-60 ">
                    Backend Development
                </h4>
                <div className="grid grid-cols-3 sm:grid-cols-5 lg:grid-cols-4 align-content-end gap-10 lg:gap-10 xl:gap-14">
                    <AnimateOnVisible animation={"fade"} duration={1.0} className=" flex flex-col items-center ">
                        <div className="rounded-[50%] w-[50px] h-[50px] shadow-lg p-[6px]  flex justify-center items-center">
                            <Nodejs />
                        </div>
                        <span className="  font-semibold mt-2 text-text1  text-[12.5px] text-center">
                            Nodejs
                        </span>
                    </AnimateOnVisible>
                    <AnimateOnVisible animation={"fade"} duration={1.0} className=" flex flex-col items-center ">
                        <div className="rounded-[50%] w-[50px] h-[50px] shadow-lg p-[6px]  flex justify-center items-center">
                            <Image src={expressjs} alt="Express js" className="w-[90px] " />
                        </div>
                        <span className="  font-semibold mt-2 text-text1  text-[12.5px] text-center">
                            ExpressJs
                        </span>
                    </AnimateOnVisible>
                    <AnimateOnVisible animation={"fade"} duration={1.0} className=" flex flex-col items-center ">
                        <div className="rounded-[50%] w-[50px] h-[50px] shadow-lg p-[6px]  flex justify-center items-center">
                            <NextJs />
                        </div>
                        <span className="  font-semibold mt-2 text-text1  text-[12.5px] text-center">
                            Nextjs
                        </span>
                    </AnimateOnVisible>
                    <AnimateOnVisible animation={"fade"} duration={1.0} className=" flex flex-col items-center ">
                        <div className="rounded-[50%] w-[50px] h-[50px] shadow-lg p-[6px]  flex justify-center items-center">
                            <MongoDb />
                        </div>
                        <span className="  font-semibold mt-2 text-text1  text-[12.5px] text-center">
                            MongoDb
                        </span>
                    </AnimateOnVisible>

                    <AnimateOnVisible animation={"fade"} duration={1.0} className=" flex flex-col items-center ">
                        <div className="rounded-[50%] w-[50px] h-[50px] shadow-lg p-[6px]  flex justify-center items-center">
                            <Prisma />
                        </div>
                        <span className="  font-semibold mt-2 text-text1  text-[12.5px] text-center">
                            Prisma
                        </span>
                    </AnimateOnVisible>
                </div>
            </div>
            <div className="flex flex-col lg:flex-row justify-center  lg:justify-between ">
                <h4 className="   theme-gradient-text font-bold text-[28px]    mb-10 lg:mb-0 xl:mr-60">
                    Other  Tools & Technologies
                </h4>
                <div className="grid grid-cols-3 sm:grid-cols-5 lg:grid-cols-4 gap-10 lg:gap-10 xl:gap-14">
                    <AnimateOnVisible animation={"fade"} duration={1.0} className=" flex flex-col items-center ">
                        <div className="rounded-[50%] w-[50px] h-[50px] shadow-lg p-[6px]  flex justify-center items-center">
                            <Image src={git} alt="Git" className="w-[90px] " />
                        </div>
                        <span className="  font-semibold mt-2 text-text1  text-[12.5px] text-center">
                            Git
                        </span>
                    </AnimateOnVisible>
                    <AnimateOnVisible animation={"fade"} duration={1.0} className=" flex flex-col items-center ">
                        <div className="rounded-[50%] w-[50px] h-[50px] shadow-lg p-[6px]  flex justify-center items-center">
                            <Image src={github} alt="Git" className="w-[90px] " />
                        </div>
                        <span className="  font-semibold mt-2 text-text1  text-[12.5px] text-center">
                            Github
                        </span>
                    </AnimateOnVisible>
                    <AnimateOnVisible animation={"fade"} duration={1.0} className=" flex flex-col items-center ">
                        <div className="rounded-[50%] w-[50px] h-[50px] shadow-lg   flex justify-center items-center">
                            <Image src={docker} alt="Docker" className="w-[90px] " />
                        </div>
                        <span className="  font-semibold mt-2 text-text1  text-[12.5px] text-center">
                            Docker
                        </span>
                    </AnimateOnVisible>
                    <AnimateOnVisible animation={"fade"} duration={1.0} className=" flex flex-col items-center ">
                        <div className="rounded-[50%] w-[50px] h-[50px] shadow-lg  flex justify-center items-center">
                            <Image src={postman} alt="Postman" className="w-[90px] " />
                        </div>
                        <span className="  font-semibold mt-2 text-text1  text-[12.5px] text-center">
                            Postman
                        </span>
                    </AnimateOnVisible>
                    <AnimateOnVisible animation={"fade"} duration={1.0} className=" flex flex-col items-center ">
                        <div className="rounded-[50%] w-[50px] h-[50px] shadow-lg p-[6px]  flex justify-center items-center">
                            <Image src={aws} alt="AWS" className="w-[90px] " />
                        </div>
                        <span className="  font-semibold mt-2 text-text1  text-[12.5px] text-center">
                            AWS
                        </span>
                    </AnimateOnVisible>
                </div>
            </div>
            {/* <Tabs defaultValue="Frontend" >
                <TabsList className="  flex gap-2 px-2  py-7 mb-10 bg-gray-200 dark:bg-gray-900  w-fit justify-center items-center mx-auto">
                    <TabsTrigger value="Frontend" className=' text-base font-semibold py-2 px-4'>Frontend</TabsTrigger>
                    <TabsTrigger value="Backend" className=' text-base font-semibold py-2 px-4'>Backend</TabsTrigger>
                    <TabsTrigger value="Tools" className=' text-base font-semibold py-2 px-4'>Others </TabsTrigger>
                </TabsList>
                <div>

                    <TabsContent value="Frontend" className=' flex flex-col justify-center items-center outline-none border-none focus:outline-none hover:border-none focus:border-none p-3'>
                        <div className="grid  grid-cols-3 sm:grid-cols-4  lg:grid-cols-4 align-content-center  sm:gap-[70px] gap-14  ">
                            <div className=" flex flex-col items-center  col-span-1">
                                <div className="rounded-[50%] w-[50px] h-[50px] shadow-lg p-[6px]  flex justify-center items-center">
                                    <Html />
                                </div>
                                <span className="  font-semibold mt-2 text-text1  text-[12.5px] text-center">
                                    Html
                                </span>
                            </div>
                            <div className=" flex flex-col items-center  col-span-1">
                                <div className="rounded-[50%] w-[50px] h-[50px] shadow-lg p-[6px]  flex justify-center items-center">
                                    <Css />
                                </div>
                                <span className="  font-semibold mt-2 text-text1  text-[12.5px] text-center">
                                    Css
                                </span>
                            </div>
                            <div className=" flex flex-col items-center  col-span-1">
                                <div className="rounded-[50%] w-[50px] h-[50px] shadow-lg p-[6px]  flex justify-center items-center">
                                    <Js />
                                </div>
                                <span className="  font-semibold mt-2 text-text1  text-[12.5px] text-center">
                                    Javascript
                                </span>
                            </div>
                            <div className=" flex flex-col items-center  col-span-1">
                                <div className="rounded-[50%] w-[50px] h-[50px] shadow-lg p-[6px]  flex justify-center items-center">
                                    <Reactjs />
                                </div>
                                <span className="  font-semibold mt-2 text-text1  text-[12.5px] text-center">
                                    Reactjs
                                </span>
                            </div>
                            <div className=" flex flex-col items-center  col-span-1">
                                <div className="rounded-[50%] w-[50px] h-[50px] shadow-lg p-[6px]  flex justify-center items-center">
                                    <NextJs />
                                </div>
                                <span className="  font-semibold mt-2 text-text1  text-[12.5px] text-center">
                                    Nextjs
                                </span>
                            </div>
                            <div className=" flex flex-col items-center  col-span-1">
                                <div className="rounded-[50%] w-[50px] h-[50px] shadow-lg p-[6px]  flex justify-center items-center">
                                    <Bootstrap />
                                </div>
                                <span className="  font-semibold mt-2 text-text1  text-[12.5px] text-center">
                                    Bootstrap
                                </span>
                            </div>
                            <div className=" flex flex-col items-center  col-span-1">
                                <div className="rounded-[50%] w-[50px] h-[50px] shadow-lg p-[6px]  flex justify-center items-center">
                                    <Tailwind />
                                </div>
                                <span className="  font-semibold mt-2 text-text1  text-[12.5px] text-center">
                                    Tailwind
                                </span>
                            </div>
                            <div className=" flex flex-col items-center  col-span-1">
                                <div className="rounded-[50%] w-[50px] h-[50px] shadow-lg p-[6px]  flex justify-center items-center">
                                    <Image src={shadcn} alt="shadcn " className="w-[90px] " />
                                </div>
                                <span className="  font-semibold mt-2 text-text1  text-[12.5px] text-center">
                                    Shadcn UI
                                </span>
                            </div>
                            <div className=" flex flex-col items-center  col-span-1">
                                <div className="rounded-[50%] w-[50px] h-[50px] shadow-lg p-[6px]  flex justify-center items-center">
                                    <Image src={redux} alt="Redux Toolkit " className="w-[90px] " />
                                </div>
                                <span className="  font-semibold mt-2 text-text1  text-[12.5px] text-center">
                                    Redux <br /> Toolkit
                                </span>
                            </div>
                            <div className=" flex flex-col items-center  col-span-1">
                                <div className="rounded-[50%] w-[50px] h-[50px] shadow-lg  flex justify-center items-center">
                                    <Image src={zustand} alt="Zustand" className="w-[90px] h-auto " />
                                </div>
                                <span className="  font-semibold mt-2 text-text1  text-[12.5px] text-center">
                                    Zustand
                                </span>
                            </div>
                            <div className=" flex flex-col items-center  col-span-1">
                                <div className="rounded-[50%] w-[50px] h-[50px] shadow-lg p-[6px]  flex justify-center items-center">
                                    <Image src={zod} alt="zod" className="w-[90px] " />
                                </div>
                                <span className="  font-semibold mt-2 text-text1  text-[12.5px] text-center">
                                    Zod
                                </span>
                            </div>
                        </div>
                    </TabsContent>
                    <TabsContent value="Backend" className=' -mt-6 flex flex-col justify-center items-center outline-none border-none focus:outline-none hover:border-none focus:border-none p-3'>
                        <div className="grid  grid-cols-3 sm:grid-cols-4  lg:grid-cols-4 align-content-center sm:gap-[70px] gap-14  ">
                            <AnimateOnVisible animation={"fade"} duration={1.0} className=" flex flex-col items-center ">
                                <div className="rounded-[50%] w-[50px] h-[50px] shadow-lg p-[6px]  flex justify-center items-center">
                                    <Nodejs />
                                </div>
                                <span className="  font-semibold mt-2 text-text1  text-[12.5px] text-center">
                                    Nodejs
                                </span>
                            </AnimateOnVisible>
                            <AnimateOnVisible animation={"fade"} duration={1.0} className=" flex flex-col items-center ">
                                <div className="rounded-[50%] w-[50px] h-[50px] shadow-lg p-[6px]  flex justify-center items-center">
                                    <Image src={expressjs} alt="Express js" className="w-[90px] " />
                                </div>
                                <span className="  font-semibold mt-2 text-text1  text-[12.5px] text-center">
                                    ExpressJs
                                </span>
                            </AnimateOnVisible>
                            <AnimateOnVisible animation={"fade"} duration={1.0} className=" flex flex-col items-center ">
                                <div className="rounded-[50%] w-[50px] h-[50px] shadow-lg p-[6px]  flex justify-center items-center">
                                    <NextJs />
                                </div>
                                <span className="  font-semibold mt-2 text-text1  text-[12.5px] text-center">
                                    Nextjs
                                </span>
                            </AnimateOnVisible>
                            <AnimateOnVisible animation={"fade"} duration={1.0} className=" flex flex-col items-center ">
                                <div className="rounded-[50%] w-[50px] h-[50px] shadow-lg p-[6px]  flex justify-center items-center">
                                    <MongoDb />
                                </div>
                                <span className="  font-semibold mt-2 text-text1  text-[12.5px] text-center">
                                    MongoDb
                                </span>
                            </AnimateOnVisible>

                            <AnimateOnVisible animation={"fade"} duration={1.0} className=" flex flex-col items-center ">
                                <div className="rounded-[50%] w-[50px] h-[50px] shadow-lg p-[6px]  flex justify-center items-center">
                                    <Prisma />
                                </div>
                                <span className="  font-semibold mt-2 text-text1  text-[12.5px] text-center">
                                    Prisma
                                </span>
                            </AnimateOnVisible>
                        </div>
                    </TabsContent>
                    <TabsContent value="Tools" className=' -mt-6 flex flex-col justify-center items-center outline-none border-none focus:outline-none hover:border-none focus:border-none p-3'>
                        <div className="grid  grid-cols-3 sm:grid-cols-4  lg:grid-cols-4 align-content-center sm:gap-[70px] gap-14  ">
                            <AnimateOnVisible animation={"fade"} duration={1.0} className=" flex flex-col items-center ">
                                <div className="rounded-[50%] w-[50px] h-[50px] shadow-lg p-[6px]  flex justify-center items-center">
                                    <Image src={git} alt="Git" className="w-[90px] " />
                                </div>
                                <span className="  font-semibold mt-2 text-text1  text-[12.5px] text-center">
                                    Git
                                </span>
                            </AnimateOnVisible>
                            <AnimateOnVisible animation={"fade"} duration={1.0} className=" flex flex-col items-center ">
                                <div className="rounded-[50%] w-[50px] h-[50px] shadow-lg p-2  flex justify-center items-center">
                                    <Image src={github} alt="Git" className="w-[90px] " />
                                </div>
                                <span className="  font-semibold mt-2 text-text1  text-[12.5px] text-center">
                                    Github
                                </span>
                            </AnimateOnVisible>
                            <AnimateOnVisible animation={"fade"} duration={1.0} className=" flex flex-col items-center ">
                                <div className="rounded-[50%] w-[50px] h-[50px] shadow-lg   flex justify-center items-center">
                                    <Image src={docker} alt="Docker" className="w-[90px] " />
                                </div>
                                <span className="  font-semibold mt-2 text-text1  text-[12.5px] text-center">
                                    Docker
                                </span>
                            </AnimateOnVisible>
                            <AnimateOnVisible animation={"fade"} duration={1.0} className=" flex flex-col items-center ">
                                <div className="rounded-[50%] w-[50px] h-[50px] shadow-lg  flex justify-center items-center">
                                    <Image src={postman} alt="Postman" className="w-[90px] " />
                                </div>
                                <span className="  font-semibold mt-2 text-text1  text-[12.5px] text-center">
                                    Postman
                                </span>
                            </AnimateOnVisible>
                        </div>
                    </TabsContent>
                </div>
            </Tabs> */}
            <br />
            <br />
        </div>
    )
}

export default Skills