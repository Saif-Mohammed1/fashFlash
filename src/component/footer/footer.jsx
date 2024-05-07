import Link from "next/link";
import GitHubIcon from "@mui/icons-material/GitHub";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-8 mt-4">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        <div className="text-center md:text-left">
          <h3 className="text-lg font-bold mb-2">fashFlash </h3>
          <p className="text-sm">123 Street , Cairo, Egypt</p>
          <p className="text-sm">Phone: +1234567890</p>
          <p className="text-sm">Email: info@example.com</p>
        </div>
        <div className="flex justify-center md:justify-start mt-4 md:mt-0">
          <Link target="_blank" href="/about">
            <span className="text-gray-300 hover:text-white mr-4">
              About Us
            </span>
          </Link>
          <Link
            target="_blank"
            href="https://portfolio-v2-liard-seven.vercel.app"
          >
            <span className="text-gray-300 hover:text-white mr-4">
              Portfolio
            </span>
          </Link>
          <Link target="_blank" href="/contact-us">
            <span className="text-gray-300 hover:text-white">Contact Us</span>
          </Link>{" "}
        </div>
        <div className="mt-4 md:mt-0">
          <p className="text-center md:text-right">Follow Us</p>
          <div className="flex justify-center md:justify-end mt-2">
            <Link target="_blank" href="#">
              <span className="text-gray-300 hover:text-white mr-4">
                <FacebookIcon />
              </span>
            </Link>
            <Link target="_blank" href="#">
              <span className="text-gray-300 hover:text-white mr-4">
                <TwitterIcon />
              </span>
            </Link>
            <Link target="_blank" href="#">
              <span className="text-gray-300 hover:text-white mr-4">
                <InstagramIcon />
              </span>
            </Link>
            <Link target="_blank" href="https://github.com/Saif-Mohammed1">
              <span className="text-gray-300 hover:text-white">
                <GitHubIcon />
              </span>
            </Link>
          </div>
          <p className="mt-4 text-sm text-center">
            Created by Saif -{" "}
            <span className="italic">Full Stack Web Developer</span>
          </p>
          <p className="mt-2 text-sm text-center">
            &copy; {new Date().getFullYear()} fashFlash. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
