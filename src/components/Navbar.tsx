"use client";
import React from "react";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { Button } from "./ui/button";
import { User } from "next-auth";

function Navbar() {
  const { data: session } = useSession();
  const user: User = session?.user;

  return (
    <nav className="fixed top-0 w-full p-4 md:p-6 shadow-md bg-black text-white text-sm z-50">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        <a href="#" className="text-xl font-bold mb-4 md:mb-0">
          FeedBack Genius
        </a>
        {session ? (
          <>
            <span className="mr-4">
              Welcome, <em>{user.username || user.email}</em>
            </span>
            <Button
              onClick={() => signOut({ callbackUrl: "/" })}
              className="w-full md:w-auto bg-slate-100 text-black border border-white px-4 py-2 rounded hover:bg-black hover:text-white transition-colors duration-300"
              variant="outline"
            >
              Sign Out
            </Button>
          </>
        ) : (
          <div className="flex items-center justify-end space-x-4">
            <Link href="/sign-in">
              <Button
                className="w-full md:w-auto bg-slate-100 text-black border border-white px-4 py-2 rounded hover:bg-black hover:text-white transition-colors duration-300"
                variant={"outline"}
              >
                Login
              </Button>
            </Link>
            <Link href="/sign-up">
              <Button
                className="w-full md:w-auto bg-black text-white border border-white px-4 py-2 rounded hover:bg-white hover:text-black transition-colors duration-300"
                variant={"outline"}
              >
                Sign Up
              </Button>
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
