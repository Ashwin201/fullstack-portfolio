"use client";
import { TbPoint, TbPointFilled } from "react-icons/tb";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { BsGithub } from "react-icons/bs";
import { IoIosArrowBack, IoIosArrowForward, IoIosImages } from "react-icons/io";
import CardDetailSkeleton from "./Skeletons/CardDetailSkeleton";

const ProjectDetail = ({ id }: { id: string }) => {
  const [data, setData] = useState<any>()
  const [loading, setLoading] = useState(true)
  // console.log(id)

  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibility, setVisibility] = useState(6);
  // console.log(data)
  const goToPrevSlide = () => {
    setCurrentIndex((prev) => prev - 1);
  };

  const goToNextSlide = () => {
    setCurrentIndex((prev) => prev + 1);
  };

  const handleImages = (index: number) => {
    setCurrentIndex(index);
  };


  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`/api/project/${id}`)
        if (res.ok) {
          const info = await res.json();
          setData(info);
          setLoading(false)
        }
      } catch (error) {

      }

    }
    fetchData()
  }, [])

  // console.log(data)

  return (
    <>
      {
        loading ?
          <CardDetailSkeleton /> : (
            <section className="flex flex-col gap-14   py-3 px-2 sm:px-8 sm:py-8">
              <div className="grid grid-cols-2 gap-0 lg:gap-10 place-items-start">
                <div className="col-span-2 lg:col-span-1">
                  <div className="relative">
                    <img
                      src={`${data?.image?.[currentIndex]}`}
                      alt="Project Image"
                      width={100}
                      height={100}
                      className="w-full h-auto lg:h-[250px]  object-contain object-center rounded-md"
                    />

                    {currentIndex > 0 && (
                      <span
                        onClick={goToPrevSlide}
                        className="cursor-pointer absolute top-1/2 left-3 rounded-full p-1 text-white bg-gray-400"
                      >
                        <IoIosArrowBack />
                      </span>
                    )}
                    {currentIndex < data?.image?.length - 1 && (
                      <span
                        onClick={goToNextSlide}
                        className="cursor-pointer absolute top-1/2 right-3 rounded-full p-1 text-white bg-gray-400"
                      >
                        <IoIosArrowForward />
                      </span>
                    )}
                  </div>
                  <div>
                    <div className="mt-6 grid grid-cols-5 sm:grid-cols-7 gap-3">
                      {data?.image?.slice(0, visibility).map((img: any, index: any) => (
                        <div className="col-span-1" key={index}>
                          <Image
                            src={`${img}`}
                            alt="Image"
                            width={100}
                            height={100}
                            onClick={() => handleImages(index)}
                            className={`cursor-pointer object-cover rounded-md w-full h-[40px] 
                    ${index === currentIndex
                                ? "border-gray-950 dark:border-gray-300 border-2"
                                : "border-2 border-gray-100 dark:border-gray-950"
                              }`}
                          />
                        </div>
                      ))}
                      {visibility < data?.image?.length && (
                        <div
                          onClick={() => setVisibility(visibility + 4)}
                          className="transition-all duration-300 cursor-pointer text-gray-800 dark:text-gray-300 flex flex-col items-center justify-center text-xs font-medium px-3 py-1 rounded-md border-2 border-gray-500"
                        >
                          <IoIosImages size={14} />
                          more
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                <div className="col-span-2 lg:col-span-1 flex flex-col justify-center gap-3 ">
                  <p className="text-lg  font-bold mt-6 lg:mt-0 bg-clip-text text-transparent dark:bg-gradient-to-t dark:from-zinc-900 dark:to-gray-950  bg-gradient-to-t from-white to-zinc-50">{data?.category}</p>
                  <div className="font-bold text-2xl  theme-gradient-text">{data?.title}</div>
                  <p className="font-medium text-gray-600 dark:text-gray-300">{data?.description}</p>
                  <div className="flex justify-between items-center mt-2">
                    {
                      data?.github &&
                      <Link href={`${data?.github}`} aria-label="link" target="_blank">
                        <BsGithub size={38} />
                      </Link>
                    }
                    <div className="flex w-full justify-end">
                      <Link
                        href={`${data?.live}`}
                        target="_blank"
                        aria-label="See Live"
                        className="font-semibold text-[17px] underline transition-all duration-300 text-gray-600 dark:text-gray-300"
                      >
                        See Live
                      </Link>
                    </div>
                  </div>
                </div>
              </div>

              {data?.technology && (
                <div>
                  <h3 className="font-bold text-2xl mb-5  theme-gradient-text">Technologies Used 💻 </h3>
                  <div className="flex flex-wrap items-start gap-3 sm:gap-6">
                    {data?.technology?.map((item: any, index: any) => (
                      <span
                        key={index}
                        className="py-[6px] px-4 sm:px-6 text-base font-semibold bg-inherit text-gray-600 dark:text-gray-300   rounded-full cursor-pointer shadow-sm dark:shadow-gray-800 shadow-gray-300"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {data?.feature?.length > 0 && (
                <div>
                  <h3 className="font-bold text-2xl mb-5  theme-gradient-text">Key Features 🚀</h3>
                  <div className="flex flex-col gap-2">
                    {data?.feature?.map((item: any, index: any) => (
                      <p
                        key={index}
                        className="flex items-start text-start lg:items-center text-base font-semibold text-gray-600 dark:text-gray-300"
                      >
                        ◾ &nbsp; {item}
                      </p>
                    ))}
                  </div>
                </div>
              )}
            </section>
          )
      }

    </>
  );
};

export default ProjectDetail;
