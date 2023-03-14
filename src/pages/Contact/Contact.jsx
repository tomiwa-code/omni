import SideSection from "../../components/SideSection";
import { MdAttachFile, MdOutlineClose } from "react-icons/md";
import { useRef, useState } from "react";

const Contact = () => {
  const [fileInfo, setFileInfo] = useState({
    name: "",
    size: 0,
  });

  const fileRef = useRef();

  const handleFileChange = (e) => {
    const name = e.target.files[0].name;
    const covertToByte = e.target.files[0].size / 1024;
    const size = covertToByte / 1024;
    setFileInfo({
      name: name,
      size: size.toFixed(1),
    });
  };

  return (
    <div className="container mx-auto">
      <div className="flex gap-6 items-start ">
        <div className="flex-[2] bg-[white] rounded-lg py-8 overflow-hidden">
          <h2 className="font-raleway text-3xl font-semibold px-8 pb-10">
            Contact us
          </h2>
          <form className="mt-5 px-8 space-y-5">
            <div className="space-y-3">
              <span className="text-sm font-medium">Full name</span>
              <input
                type="text"
                placeholder="Ayoola ogunbase"
                className="w-full placeholder:text-[#ccc] focus:outline-none bg-[transparent] rounded-lg border border-[#dbdbdb] py-4 px-5"
              />
            </div>
            <div className="space-y-3">
              <span className="text-sm font-medium">Your email address</span>
              <input
                type="text"
                placeholder="example@gmail.com"
                className="w-full placeholder:text-[#ccc] focus:outline-none bg-[transparent] rounded-lg border border-[#dbdbdb] py-4 px-5"
              />
            </div>
            <div className="space-y-3">
              <span className="text-sm font-medium">Type of issue</span>
              <input
                type="text"
                placeholder="I want to make a pre-order"
                className="w-full placeholder:text-[#ccc] focus:outline-none bg-[transparent] rounded-lg border border-[#dbdbdb] py-4 px-5"
              />
            </div>
            <div className="space-y-3">
              <span className="text-sm font-medium">Tell us more</span>
              <textarea
                cols="30"
                rows="5"
                placeholder="I would like to make a pre-order and I  don't know if that is possible..."
                className="w-full placeholder:text-[#ccc] resize-none focus:outline-none bg-[transparent] rounded-lg border border-[#dbdbdb] py-4 px-5"
              ></textarea>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Attach a file</span>
                <p className="text-[#ccc] text-sm">Maximum file size: 25 MB</p>
              </div>
              <div className="border border-[#ccc] w-full rounded-lg py-4 px-5 relative">
                <label
                  htmlFor="attachment-file-input"
                  className="flex items-center space-x-2 cursor-pointer"
                >
                  <MdAttachFile className="text-3xl text-[#ccc]" />
                  {fileInfo.name !== "" && fileInfo.size !== "" ? (
                    <span className="text-sm">
                      {fileInfo.name}{" "}
                      <span className="text-[#ccc]">({fileInfo.size}MB)</span>
                    </span>
                  ) : (
                    <span className=" text-[#ccc]">Choose Files</span>
                  )}
                </label>
                <input
                  id="attachment-file-input"
                  type="file"
                  hidden
                  className="w-full"
                  ref={fileRef}
                  onChange={handleFileChange}
                />
                {fileInfo.name !== "" && fileInfo.size !== "" && (
                  <MdOutlineClose
                    className="text-[#ccc] text-2xl cursor-pointer absolute right-5 top-[50%] -translate-y-[50%]"
                    onClick={() => {
                      fileRef.current.value = "";
                      setFileInfo({
                        name: "",
                        size: "",
                      });
                    }}
                  />
                )}
              </div>
              <div className="w-full text-right pt-5">
                <button className="px-8 font-semibold py-3 bg-primary text-white rounded-lg">
                  Submit
                </button>
              </div>
            </div>
          </form>
        </div>
        <div className="flex-1">
          <SideSection />
        </div>
      </div>
    </div>
  );
};

export default Contact;
