"use client";

import React, { useEffect, useRef, useState } from "react";
import WorkCounters from "./WorkCounters";
import About from "./About";
import Services from "./Services";
import Skills from "./Skills";
import Project from "./Project";
import Contact from "./Contact";
import dynamic from "next/dynamic";
import Link from "next/link";
import { FaGithub, FaInstagram, FaLinkedin } from "react-icons/fa";
import { Button } from "./ui/button";
import { Badge, ChevronRight, CircleUser, Folder, FolderDown, Github, Linkedin, Twitter } from "lucide-react";
import { useAbout } from "@/context/AboutProvider";
import AnimateOnVisible from "./Animations";
import Image from "next/image";
const PlayerWithNoSSR = dynamic(
  () => import('@lottiefiles/react-lottie-player').then(module => module.Player),
  { ssr: false }
);
function HomePage() {
  const { userData } = useAbout();
  return (
    <div className="sm:container px-4    flex flex-col justify-center">
      <section className=" py-10 mb-2 sm:py-14  sm:mb-4  flex flex-col md:flex-row items-center gap-8 md:gap-16">
        <div className="flex-1 space-y-3 sm:space-y-5">
          <AnimateOnVisible animation={"slideRight"} duration={0.6}>
            <Button variant={"outline"} className=" font-medium  rounded-full mb-2">
              Full Stack Developer
            </Button>
          </AnimateOnVisible>
          <AnimateOnVisible animation={"slideRight"} duration={0.6} className="text-[30px] sm:text-4xl  md:text-[50px] lg:text-[55px] font-bold  py-t
            theme-gradient-text">
            <span >Hi, I&apos;m </span><span>Ashmin Sharma</span>
          </AnimateOnVisible>
          <AnimateOnVisible animation={"slideRight"} duration={0.7} className=" -mt-2 text-gray-600 dark:text-gray-300 text-base sm:text-[17px] font-medium">
            A full stack developer proficient in building seamless web applications. Skilled in crafting intuitive front-end designs and scalable back-end systems.
            Let&apos;s turn ideas into impactful solutions.
          </AnimateOnVisible>
          <AnimateOnVisible animation={"slideRight"} duration={0.9} className="flex gap-4 pt-4">
            <Link href={"/#projects"}>
              <Button size="sm">
                <Folder size={19} /> &nbsp;
                View My Work
              </Button>
            </Link>
            <Link href={`${userData?.resume}`} className=" " target="_blank" aria-label="Download CV">
              <Button size="sm" variant="outline" className=" text-sm font-medium">
                <FolderDown size={19} /> &nbsp;  Download CV
              </Button>
            </Link>
          </AnimateOnVisible>
          <AnimateOnVisible animation={"slideRight"} duration={0.9} className="flex items-center space-x-4 pt-4">
            <Link
              href="https://instagram.com/ashmin_sharma_"
              aria-label="Insta"
              target="_blank"
            >
              <FaInstagram size={26} />
            </Link>
            <Link
              href="https://github.com/Ashwin201"
              aria-label="Github"
              target="_blank"
            >
              <FaGithub size={26} />
            </Link>
            <Link
              href="https://www.linkedin.com/in/ashmin-sharma-6a4867257"
              aria-label="Linkedin"
              target="_blank"
            >
              <FaLinkedin size={26} />
            </Link>
          </AnimateOnVisible>
        </div>
        {/* <div className="flex-1 hidden xl:flex justify-center ">
          <div className="relative lg:w-80 lg:h-80 rounded-full overflow-hidden border-8 dark:border-none border-muted bg-muted dark:bg-inherit">
            <PlayerWithNoSSR
              autoplay
              loop
              src={`/developer.json`}

              className={` h-[350px] w-auto  md:flex hidden lg:-ml-32`}
            />
          </div>
        </div> */}
      </section>
      <br />
      <WorkCounters />
      <About />
      <Services />
      <Skills />
      <Project />
      <Contact />

    </div>
  );
}

export default HomePage;
