import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  FaExternalLinkAlt,
  FaGithub,
  FaInstagram,
  FaLinkedin,
  FaTwitter,
} from "react-icons/fa";
import { useSession } from "next-auth/react";

export function Footer() {
  return (
    <footer className="fixed bottom-0 w-full text-center p-2 md:p-4 bg-black text-white text-sm z-20">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p>©2024 FeedBack Genius.</p>
          </div>
          <div className="flex justify-center items-center">
            <Link href="https://feedback-genius.vercel.app/u/feedbackgenius">
              <Button
                className="w-full md:w-auto bg-black text-white border border-white px-4 py-2 rounded hover:bg-white hover:text-black transition-colors duration-300"
                variant={"outline"}
              >
                <span>Review Us Here!&nbsp;</span>
                <FaExternalLinkAlt className="text-white" />
              </Button>
            </Link>
          </div>
          <div className="flex space-x-4">
            <a
              href="https://github.com/alfastrek"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gray-300 transition-colors duration-300"
              title="GitHub"
            >
              <FaGithub size={24} />
            </a>
            <a
              href="https://twitter.com/alfatechdev"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gray-300 transition-colors duration-300"
            >
              <FaTwitter size={24} />
            </a>
            <a
              href="https://instagram.com/alfastrek"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gray-300 transition-colors duration-300"
            >
              <FaInstagram size={24} />
            </a>
            <a
              href="https://linkedin.com/in/aradhyashukla/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gray-300 transition-colors duration-300"
            >
              <FaLinkedin size={24} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
