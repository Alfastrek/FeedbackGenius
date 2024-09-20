"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Mail } from "lucide-react"; // Assuming you have an icon for messages
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Autoplay from "embla-carousel-autoplay";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import messages from "@/messages.json";
import { BackgroundBeams } from "@/components/ui/background-beams";

import {
  FaExternalLinkAlt,
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaLinkedin,
  FaGithub,
} from "react-icons/fa";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

export default function Home() {
  return (
    <>
      {/* Main content */}
      <main className="flex-grow flex flex-col items-center justify-center px-4 md:px-24 py-12 text-white ">
        <BackgroundBeams className="absolute inset-0 z-0" />
        <section className="relative z-10 text-center mb-8 md:mb-12">
          <h1 className="text-3xl md:text-5xl font-bold">
            Dive into the World of{" "}
            <span className="gradient-text">Anonymous </span> Feedback
          </h1>
          <p className="mt-3 md:mt-4 text-base md:text-lg">
            <span className="highlighted-text">
              Empowering creators and businesses to grow with your honest,
              anonymous feedback.
            </span>
          </p>
        </section>

        {/* Carousel for Messages */}
        <Carousel
          plugins={[Autoplay({ delay: 2000 })]}
          className="w-full max-w-lg md:max-w-xl"
        >
          <CarouselContent>
            {messages.map((message, index) => (
              <CarouselItem key={index} className="p-4">
                <Card>
                  <CardHeader>
                    <div className="flex items-center space-x-4">
                      <Avatar>
                        <AvatarImage src={message.image} />
                        <AvatarFallback>
                          {message.user.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <CardTitle>
                        <p>
                          Message From{" "}
                          <div className="gradient-text-carousel">
                            {message.user}
                          </div>{" "}
                        </p>
                      </CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="flex flex-col md:flex-row items-start space-y-2 md:space-y-0 md:space-x-4">
                    <Mail className="flex-shrink-0" />
                    <div>
                      <p>{message.content}</p>
                      <p className="text-xs text-muted-foreground">
                        {message.received}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </main>

      {/* Footer */}
      <footer className="text-center p-2 md:p-4 bg-black text-white text-sm z-20">
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
    </>
  );
}
