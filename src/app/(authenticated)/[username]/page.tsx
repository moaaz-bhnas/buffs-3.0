"use client";

import Container from "@/components/container/Container";
import { PageProps } from "../../../../.next/types/app/(authenticated)/[username]/page";
import { ServerApiClient } from "@/apis/server-api-client";
import Avatar from "@/components/avatar/Avatar";
import ThemeButton from "@/components/theme-button/ThemeButton";
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
    </Container>
  );
}
