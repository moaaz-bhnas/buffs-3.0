"use client";

import Container from "@/components/container/Container";
import { PageProps } from "../../../../.next/types/app/(authenticated)/[username]/page";
import { ServerApiClient } from "@/apis/server-api-client";
import Avatar from "@/components/avatar/Avatar";
import ThemeButton from "@/components/theme-button/ThemeButton";
import { PlusIcon } from "@heroicons/react/24/outline";
import classNames from "../../../helpers/style/classNames";

export default async function page({ params }: PageProps) {
  const serverApiClient = new ServerApiClient();
  const userResult = await serverApiClient.getUserByUsername(params.username);
  if (userResult.isErr()) {
    return <Container>Oops, User not found</Container>;
  }
  return (
    <Container>
      <div className="flex">
        <div className="w-40 lg:mr-8">
          <Avatar avatarUrl={userResult.value.avatar} size={150} />
        </div>
        <div className="flex w-9/12 flex-col">
          <div className="flex">
            <h1 className="font-medium text-lg w-1/2">
              {userResult.value.displayName}
            </h1>
            <ThemeButton
              type="button"
              className="p-10 hover:bg-teal-500 font-bold">
              Follow
            </ThemeButton>
          </div>
          <div className="mt-5">
            <ul className="flex justify-between md:w-9/12">
              <li className="text-base md:text-lg font-medium text-center">
                <span className="font-bold">208 </span>reviews
              </li>
              <li className="text-base md:text-lg font-medium text-center">
                <span className="font-bold">20K </span>followers
              </li>
              <li className="text-base md:text-lg font-medium text-center">
                <span className="font-bold">400 </span>following
              </li>
            </ul>
          </div>
          <div className="mt-5 font-semibold">{userResult.value.username}</div>
          <div>
            🎬 Movie Lover 🍿 | 📝 Emojee Reviewer 🎭✨ | 🌟 Sharing My
            Cinematic Emotions! 😍🎉 Welcome to my movie realm! 🎉 As a devoted
            film enthusiast, I express my cinematic experiences through
            captivating emojee reviews! 📝💖 From heartwarming to
            adrenaline-pumping moments, I&apos;ve got all the emojis to convey
            the magic of movies! 🎥✨ Join me on this emotive journey as we
            uncover cinematic treasures together! 🏆🎬 Let&apos;s create a
            wonderland of emotions through movies and share our thoughts and
            recommendations! 🤗💬🍿
          </div>
        </div>
      </div>
      <div>
        <h1 className="text-lg font-normal tracking-wider text-slate-700">
          FAVORITE FILMS
        </h1>
        <hr className="h-px my-3 bg-gray-200 border-0 dark:bg-gray-500" />
        <div className="flex flex-row justify-between">
          <div className="w-28 h-48 md:w-52 md:h-[22rem] lg:w-[17rem] lg:h-96 bg-slate-300 rounded-md flex justify-center group hover:drop-shadow-xl ease-in duration-150 cursor-pointer">
            <PlusIcon className="w-12 h-12 md:w-20 md:h-20 m-auto opacity-20 group-hover:opacity-90 transition-opacity ease-in duration-150" />
          </div>
          <div className="w-28 h-48 md:w-52 md:h-[22rem] lg:w-[17rem] lg:h-96 bg-slate-300 rounded-md flex justify-center group hover:drop-shadow-xl ease-in duration-150 cursor-pointer">
            <PlusIcon className="w-12 h-12 md:w-20 md:h-20 m-auto opacity-20 group-hover:opacity-90 transition-opacity ease-in duration-150" />
          </div>
          <div className="w-28 h-48 md:w-52 md:h-[22rem] lg:w-[17rem] lg:h-96 bg-slate-300 rounded-md flex justify-center group hover:drop-shadow-xl ease-in duration-150 cursor-pointer">
            <PlusIcon className="w-12 h-12 md:w-20 md:h-20 m-auto opacity-20 group-hover:opacity-90 transition-opacity ease-in duration-150" />
          </div>
        </div>
      </div>
    </Container>
  );
}
