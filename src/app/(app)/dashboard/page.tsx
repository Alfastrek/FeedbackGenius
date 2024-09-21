"use client";

import { MessageCard } from "@/components/MessageCard";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Message } from "@/model/User";
import { ApiResponse } from "@/types/ApiResponse";
import { zodResolver } from "@hookform/resolvers/zod";
import axios, { AxiosError } from "axios";
import { Loader2, RefreshCcw } from "lucide-react";
import { User } from "next-auth";
import { useSession } from "next-auth/react";
import React, { useCallback, useEffect, useState, Key } from "react";
import { useForm } from "react-hook-form";
import { AcceptMessageSchema } from "@/schemas/acceptMessageSchema";
import { BackgroundGradient } from "@/components/ui/background-gradient";

function UserDashboard() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSwitchLoading, setIsSwitchLoading] = useState(false);

  const handleDeleteMessage = (messageId: string) => {
    setMessages(messages.filter((message) => message._id !== messageId));
  };

  const { data: session } = useSession();

  const form = useForm({
    resolver: zodResolver(AcceptMessageSchema),
  });

  const { register, watch, setValue } = form;
  const acceptMessages = watch("acceptMessages");

  const fetchAcceptMessages = useCallback(async () => {
    setIsSwitchLoading(true);
    try {
      const response = await axios.get<ApiResponse>("/api/accept-messages");
      setValue("acceptMessages", response.data.isAcceptingMessages);
    } catch (error) {
      console.error("Failed to fetch message settings", error);
    } finally {
      setIsSwitchLoading(false);
    }
  }, [setValue]);

  const fetchMessages = useCallback(
    async (refresh: boolean = false) => {
      setIsLoading(true);
      setIsSwitchLoading(false);
      try {
        const response = await axios.get<ApiResponse>("/api/get-messages");
        setMessages(response.data.messages || []);
        if (refresh) {
          console.log("Refreshed Messages: Showing latest messages");
        }
      } catch (error) {
        if (axios.isAxiosError(error)) {
          console.error(
            "Failed to fetch messages:",
            error.response?.data.message || error.message
          );
        } else {
          console.error("An unexpected error occurred:", error);
        }
      } finally {
        setIsLoading(false);
        setIsSwitchLoading(false);
      }
    },
    [setIsLoading, setMessages]
  );

  useEffect(() => {
    if (!session || !session.user) return;

    fetchMessages();
    fetchAcceptMessages();

    // Refresh the page on any error
    window.addEventListener("error", function () {
      window.location.reload();
    });

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener("error", function () {
        window.location.reload();
      });
    };
  }, [session, setValue, fetchAcceptMessages, fetchMessages]);

  const handleSwitchChange = async () => {
    try {
      const response = await axios.post<ApiResponse>("/api/accept-messages", {
        acceptMessages: !acceptMessages,
      });
      setValue("acceptMessages", !acceptMessages);
    } catch (error) {
      console.error("Failed to update message settings", error);
    }
  };

  if (!session || !session.user) {
    return <div></div>;
  }

  const { username } = session.user as User;

  const baseUrl = `${window.location.protocol}//${window.location.host}`;
  const profileUrl = `${baseUrl}/u/${username}`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(profileUrl);
  };

  return (
    <main className="flex items-center justify-center min-h-screenw-full dashboardbackground ">
      <div className="container w-[70%]">
        <BackgroundGradient className="rounded-[22px] p-2 bg-zinc-900  dark:bg-zinc-900 mx-auto">
          <div className="m p-6 dark:bg-zinc-900 rounded w-full relative text-white">
            <h1 className="text-4xl font-bold mb-4">User Dashboard</h1>

            <div className="mb-4">
              <h2 className="text-lg font-semibold mb-2">
                Copy Your Unique Link (Paste it in New Tab)
              </h2>
              <div className="flex items-center border border-white p-1">
                <input
                  type="text"
                  value={profileUrl}
                  disabled
                  className="input input-bordered w-full p-2 mr-2"
                  title="Profile URL"
                />
                <Button onClick={copyToClipboard}>Copy</Button>
              </div>
            </div>

            <div className="mb-4">
              <Switch
                {...register("acceptMessages")}
                checked={acceptMessages}
                onCheckedChange={handleSwitchChange}
                disabled={isSwitchLoading}
              />
              <span className="ml-2">
                Accept Messages: {acceptMessages ? "On" : "Off"}
              </span>
            </div>
            <Separator />

            <Button
              className="mt-4 bg-white text-white"
              variant="outline"
              onClick={(e) => {
                e.preventDefault();
                fetchMessages(true);
              }}
            >
              {isLoading ? (
                <Loader2 className="h-4 w-4 animate-spin text-black" />
              ) : (
                <RefreshCcw className="h-4 w-4 text-black" />
              )}
            </Button>
            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-6">
              {messages.length > 0 ? (
                messages.map((message: Message) => (
                  <MessageCard
                    key={message._id as Key}
                    message={message as Message}
                    onMessageDelete={handleDeleteMessage}
                  />
                ))
              ) : (
                <p>No messages yet, Share your link more!</p>
              )}
            </div>
          </div>
        </BackgroundGradient>
      </div>
    </main>
  );
}

export default UserDashboard;
