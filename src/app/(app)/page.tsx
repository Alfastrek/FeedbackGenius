"use client";

import { useEffect, useState } from "react";
import { Mail } from "lucide-react"; // Assuming you have an icon for messages
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Autoplay from "embla-carousel-autoplay";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import messages from "@/messages.json";
import { BackgroundBeams } from "@/components/ui/background-beams";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

export default function Home() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);
  return (
    <>
      {/* Main content */}
      <main className="flex-grow flex flex-col items-center justify-center px-4 md:px-24 py-12 text-white ">
        <BackgroundBeams className="absolute inset-0 z-0" />
        <section className="relative z text-center mb-8 md:mb-12">
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
    </>
  );
}
