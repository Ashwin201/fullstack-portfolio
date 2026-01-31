"use client";
import Link from "next/link";
import React, { useEffect, useState, FormEvent, ChangeEvent } from "react";
import {
  MdDeleteOutline,
  MdOutlineLibraryAdd,
  MdPublish,
} from "react-icons/md";
import { RiDeleteBinFill } from "react-icons/ri";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import Loader from "../Loader";
import { BiImageAdd, BiSolidEditAlt } from "react-icons/bi";
import { CldUploadButton } from "next-cloudinary";
import { TiDelete } from "react-icons/ti";

interface AboutData {
  _id?: string;
  role: string;
  title: string;
  shortDesc: string;
  description: string[];
  resume: string;
  image: string,
  totalProjects: string,
  totalExperience: string
}

const AboutAdmin: React.FC = () => {
  const [data, setData] = useState<AboutData[]>([]);
  const [loading, setLoading] = useState(true);
  const [descriptions, setDescriptions] = useState<string[]>([]); //Array to store multiple element of description field
  const [descInput, setDescInput] = useState("");
  const [role, setRole] = useState("");
  const [title, setTitle] = useState("");
  const [shortDesc, setShortdesc] = useState("");
  const [resumeLink, setResumeLink] = useState("");
  const [image, setImage] = useState("")
  const [publicId, setPublicId] = useState("")
  const [oldPublicId, setOldPublicId] = useState("") // Store old publicId to delete when new image is uploaded
  const [totalProjects, setTotalProjects] = useState("")
  const [totalExperience, setTotalExperience] = useState("")

  //Function to store descriptions
  const handleDescription = (e: FormEvent) => {
    e.preventDefault();
    if (descInput.trim() !== "") {
      setDescriptions((prev) => [...prev, descInput]);
      setDescInput("");
    }
  };

  //Function to delete descriptions
  const handleDeleteDescription = (index: number) => {
    setDescriptions((prev) => prev.filter((_, i) => i !== index));
  };


  // Handle Image upload
  const handleImageUpload = async (result: any) => {
    console.log(result);
    const info = result.info;
    if ("secure_url" in info && "public_id" in info) {
      const url = info.secure_url;
      const public_id = info.public_id;
      
      // Delete old image if it exists
      if (oldPublicId && oldPublicId !== public_id) {
        try {
          await fetch(`/api/removeImage`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(oldPublicId),
          });
        } catch (error) {
          console.log("Error deleting old image:", error);
        }
      }
      
      setImage(url);
      setPublicId(public_id);
      setOldPublicId(public_id); // Update old publicId to the new one
    } else {
      // Handle the case when the image limit is reached (display a message, etc.)
      console.log("Image upload fail");
    }
  };

  // For delete image
  const handleRemoveImage = async () => {
    try {
      const res = await fetch(`/api/removeImage`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(publicId),
      });

      if (res.ok) {
        setImage("");
        setPublicId("");
        setOldPublicId("");
      }
    } catch (error) {
      console.log(error);
    }
  }
  // Handling the post functionality
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!title || descriptions.length === 0 || !shortDesc || !role) {
      toast.error("Above fields are required.");
      return;
    }

    try {
      const publishResponse = await fetch(`/api/about`, {
        cache: "no-store",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          role,
          title,
          shortDesc,
          description: descriptions,
          resume: resumeLink,
          image,
          totalProjects,
          totalExperience
        }),
      });

      if (publishResponse.ok) {
        toast.success("Your details have been published successfully.");
        // Update local state without refreshing
        setData([
          ...data,
          {
            role,
            title,
            shortDesc,
            description: descriptions,
            resume: resumeLink,
            image,
            totalProjects,
            totalExperience
          },
        ]);
      }
    } catch (error) {
      console.log("Error:", error);
    }
  };

  // Handling data fetching functionality
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`/api/about`, {
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (res.ok) {
          const info = await res.json();
          setData(info);
          setLoading(false);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  // Handling Delete functionality
  const handleDelete = async (id: string) => {
    try {
      const isConfirmed = window.confirm(
        "Are you sure you want to delete your details?"
      );
      if (isConfirmed) {
        const res = await fetch(`/api/about/${id}`, {
          method: "DELETE",
        });
        if (res.ok) {
          toast.success("Your details have been deleted successfully.");
          // Update local state without refreshing
          setData((prevData) => prevData.filter((item) => item._id !== id));
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <section>
      {loading ? (
        <Loader />
      ) : data && data.length > 0 ? (
        /* //To show the data from mongodb */
        <>
          <div>
            <h1 className=" font-bold   text-3xl sm:text-5xl text-center  mb-8  ">
              Update Your Details!
            </h1>
          </div>
          {data?.map((data, index) => (
            <div
              key={index}
              className=" mt-10 shadow-sm shadow-gray-300 dark:shadow-gray-900 p-5 flex flex-col gap-3 items-start"
            >


              <div className="relative border-2 rounded-full">
                <img
                  src={`${data?.image}`}
                  alt="Image"
                  width={100}
                  height={100}
                  className=" cursor-pointer h-32 w-full rounded-full   object-cover object-center"
                />

              </div>
              <h1 className="text-gray-900 dark:text-gray-300 font-bold text-xl">
                {data?.role}
              </h1>

              <p className="text-gray-900 dark:text-gray-300 font-semibold text-lg">
                {data?.title}
              </p>
              <p className="text-gray-900 dark:text-gray-300 font-medium text-base line-clamp-4">
                {data?.shortDesc}
              </p>

              <div className="line-clamp-7">
                {data?.description?.map((item, index) => (
                  <p
                    className="  text-gray-800 dark:text-gray-300 font-medium text-sm  tracking-wide"
                    key={index}
                  >
                    {item}
                  </p>
                ))}
              </div>
              <p className="text-gray-900 dark:text-gray-300 font-medium text-base line-clamp-4">
                Total Projects : {data?.totalProjects}
              </p>
              <p className="text-gray-900 dark:text-gray-300 font-medium text-base line-clamp-4">
                Total Experience  {data?.totalExperience}
              </p>
              <div className=" flex gap-3 items-center mt-1">
                <Link
                  href={`/admin/edit-about-details/${data?._id}`}
                  className="py-[6px] px-4 w-fit bg-gray-950 rounded-md border-2 dark:border-gray-300  text-gray-50 dark:bg-gray-200 dark:text-black text-sm font-semibold flex gap-2 
          duration-300 shadow-sm "
                >
                  <BiSolidEditAlt size={20} />
                  Edit Details
                </Link>{" "}
                <button
                  onClick={() => handleDelete(data?._id as string)}
                  className="py-[6px] px-4 w-fit bg-red-700 rounded-md border-2 border-red-700  text-white  text-sm font-semibold flex gap-2 
          duration-300 shadow-sm "
                >
                  <MdDeleteOutline size={20} />
                  Delete
                </button>
              </div>
            </div>
          ))}
        </>
      ) : (
        <>
          <div>
            <h1 className=" font-bold   text-3xl sm:text-5xl text-center  mb-8  ">
              Post Your About Details!
            </h1>
          </div>
          <form className=" flex gap-5 flex-col " onSubmit={handleSubmit}>

            <div className=" w-full ">
              <h6 className="  text-lg mb-1 ml-1 w-full flex justify-center items-center  font-semibold text-gray-900 dark:text-gray-300 ">
                Add Your Profile Picture
              </h6>
              <div className=" w-full flex flex-col gap-3 justify-center items-center  rounded-md border-1 border-gray-200 dark:border-gray-800 ">
                {image && (
                  <div className="relative border-2 rounded-md">
                    <img
                      src={image}
                      alt="Image"
                      width={100}
                      height={100}
                      className=" cursor-pointer h-32 w-full   object-cover object-center"
                    />
                    <span
                      className=" cursor-pointer absolute bg-white text-black p-[1px] rounded-full -top-2 -right-2"
                      onClick={handleRemoveImage}
                    >
                      <TiDelete size={18} />
                    </span>
                  </div>
                )}
                <div className="w-full flex justify-center">
                  <CldUploadButton
                    uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_PRESET}
                    onUpload={handleImageUpload}
                    className={` p-20  border-4  flex flex-col gap-1 items-center`}
                  >
                    <BiImageAdd size={30} />
                    <h3 className="   text-sm font-medium text-gray-700 dark:text-gray-300 ">
                      {image ? "Change Image" : "Upload Image"}
                    </h3>
                  </CldUploadButton>
                </div>
              </div>

            </div>
            <div className=" w-full">
              <label
                htmlFor="totalProjects"
                className="block text-lg mb-1 ml-1 font-semibold text-gray-900 dark:text-gray-300"
              >
                Your Total Projects
              </label>

              <input
                type="text"
                id="totalProjects"
                value={totalProjects}
                onChange={(e: any) => setTotalProjects(e.target.value)}
                placeholder="Your Total Projects"
                className="mt-1 w-full rounded-md border-2 p-3 bg-[#f8f9fa] dark:bg-gray-950  font-medium border-gray-400 dark:border-gray-600  dark:focus-within:border-gray-300 focus-within:border-gray-900 shadow-sm sm:text-sm"
              />
            </div>
            <div className=" w-full">
              <label
                htmlFor="experience"
                className="block text-lg mb-1 ml-1 font-semibold text-gray-900 dark:text-gray-300"
              >
                Your Total Experience
              </label>

              <input
                type="text"
                id="experience"
                value={totalExperience}
                onChange={(e: any) => setTotalExperience(e.target.value)}
                placeholder="Your Total Experience"
                className="mt-1 w-full rounded-md border-2 p-3 bg-[#f8f9fa] dark:bg-gray-950  font-medium border-gray-400 dark:border-gray-600  dark:focus-within:border-gray-300 focus-within:border-gray-900 shadow-sm sm:text-sm"
              />
            </div>
            <div className=" w-full">
              <label
                htmlFor="role"
                className="block text-lg mb-1 ml-1 font-semibold text-gray-900 dark:text-gray-300"
              >
                Your Role
              </label>

              <input
                type="text"
                id="role"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                placeholder="Your current role"
                className="mt-1 w-full rounded-md border-2 p-3 bg-[#f8f9fa] dark:bg-gray-950  font-medium border-gray-400 dark:border-gray-600  dark:focus-within:border-gray-300 focus-within:border-gray-900 shadow-sm sm:text-sm"
              />
            </div>
            <div className=" w-full">
              <label
                htmlFor="title"
                className="block text-lg mb-1 ml-1 font-semibold text-gray-900 dark:text-gray-300"
              >
                Title of your landing page
              </label>

              <input
                type="text"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Langing page title"
                className="mt-1 w-full rounded-md border-2 p-3 bg-[#f8f9fa] dark:bg-gray-950  font-medium border-gray-400 dark:border-gray-600  dark:focus-within:border-gray-300 focus-within:border-gray-900 shadow-sm sm:text-sm"
              />
            </div>
            <div className=" w-full">
              <label
                htmlFor="shortdesc"
                className="block text-lg mb-1 ml-1 font-semibold text-gray-900 dark:text-gray-300"
              >
                Short description of your landing page
              </label>

              <textarea
                id="shortdesc"
                rows={2}
                value={shortDesc}
                onChange={(e) => setShortdesc(e.target.value)}
                placeholder="Short Description"
                className=" resize-none mt-1 w-full rounded-md border-2 p-3 bg-[#f8f9fa] dark:bg-gray-950  font-medium border-gray-400 dark:border-gray-600  dark:focus-within:border-gray-300 focus-within:border-gray-900 shadow-sm sm:text-sm"
              />
            </div>

            <div className=" w-full">
              <label
                htmlFor="description"
                className="block text-lg mb-1 ml-1 font-semibold text-gray-900 dark:text-gray-300"
              >
                Brief Description about you
              </label>

              <textarea
                rows={4}
                value={descInput}
                onChange={(e) => setDescInput(e.target.value)}
                id="description"
                placeholder="Detailed description"
                className=" resize-none mt-1 w-full rounded-md border-2 p-3 bg-[#f8f9fa] dark:bg-gray-950  font-medium border-gray-400 dark:border-gray-600  dark:focus-within:border-gray-300 focus-within:border-gray-900 shadow-sm sm:text-sm"
              />
              {descInput.length > 0 && (
                <button
                  className="py-2 px-3 bg-gray-950 rounded-md border-2 dark:border-gray-300  text-gray-300 dark:bg-gray-200 dark:text-black text-sm font-medium flex gap-2"
                  onClick={handleDescription}
                >
                  <MdOutlineLibraryAdd size={20} />
                  Add Description
                </button>
              )}

              <div className=" mt-1 flex flex-col gap-1">
                {descriptions &&
                  descriptions?.map((item, index) => (
                    <div className=" flex gap-2" key={index}>
                      <p className=" line-clamp-2 text-sm font-medium">
                        {item}{" "}
                      </p>
                      <span
                        className=" cursor-pointer text-red-700"
                        onClick={() => handleDeleteDescription(index)}
                      >
                        <RiDeleteBinFill size={20} />
                      </span>
                    </div>
                  ))}
              </div>
            </div>
            <div className=" w-full">
              <label
                htmlFor="link"
                className="block text-lg mb-1 ml-1 font-semibold text-gray-900 dark:text-gray-300"
              >
                Enter url of your resume
              </label>

              <input
                type="text"
                id="link"
                value={resumeLink}
                onChange={(e) => setResumeLink(e.target.value)}
                placeholder="Resume url"
                className="mt-1 w-full rounded-md border-2 p-3 bg-[#f8f9fa] dark:bg-gray-950  font-medium border-gray-400 dark:border-gray-600  dark:focus-within:border-gray-300 focus-within:border-gray-900 shadow-sm sm:text-sm"
              />
            </div>

            <button
              className="py-2 px-4 w-fit bg-gray-950 rounded-md border-2 dark:border-gray-300  text-gray-300 dark:bg-gray-200 dark:text-black text-sm font-semibold flex gap-2 
       duration-300 shadow-sm "
            >
              <MdPublish size={20} />
              Publish
            </button>
          </form>
        </>
      )}
    </section>
  );
};

export default AboutAdmin;
