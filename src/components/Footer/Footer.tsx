import { RiFacebookBoxFill, RiInstagramLine } from "react-icons/ri";
export default function Footer() {
  const date = new Date();
  const year = date.getFullYear();

  return (
    <div className="bg-[#242630] text-secondary p-20">
      <div className="flex justify-between">
        <div className="flex items-center">
          <img
            className="h-16 rounded-full"
            src="https://i.ibb.co/PY3Yk24/download.jpg"
            alt="log"
          />
          <p className="">
            <span className="text-2xl font-extrabold font-serif text-sky-700">
              TECH
            </span>
            <span className="text-2xl font-semibold font-mono">No</span>
          </p>
        </div>
        <div className="flex gap-20">
          <ul className="space-y-2">
            <li>Upcoming</li>
            <li>Shipping</li>
            <li>How it works</li>
          </ul>
          <ul className="space-y-2">
            <li>Support</li>
            <li>Careers</li>
          </ul>
          <ul className="space-y-2">
            <li>List your gear</li>
            <li>Contact team</li>
          </ul>
        </div>
        <div className="flex gap-2 text-2xl">
          <RiFacebookBoxFill />
          <RiInstagramLine />
        </div>
      </div>
      <div className="flex w-full mt-20 gap-5">
        <p>Privacy Policy</p>
        <p>Terms & Condition</p>
        <p className="ml-auto"> &#169; TECHNo {year}</p>
      </div>
    </div>
  );
}
