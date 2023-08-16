"use client";
import { ServerApiClient } from "@/apis/server-api-client";
import Avatar from "../avatar/Avatar";
import ThemeButton from "../theme-button/ThemeButton";

interface Props {
  username: string;
}
async function ProfileHeader({ username }: Props) {
  const serverApiClient = new ServerApiClient();
  const userResult = await serverApiClient.getUserByUsername(username);
  if (userResult.isErr()) {
    return <div>Oops, User not found</div>;
  }
  return (
    <div className="flex gap-5">
      <div className="w-[55rem] ">
        <Avatar avatarUrl={userResult.value.avatar} size={150} />
      </div>
      <div className="flex flex-col gap-5">
        <div className="flex">
          <h1 className="font-medium text-lg w-full">
            {userResult.value.displayName}
          </h1>
          <ThemeButton
            type="button"
            className="p-10 hover:bg-teal-500 font-bold">
            Follow
          </ThemeButton>
        </div>
        <div>
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
        <div className="font-semibold">{userResult.value.username}</div>
        <div>
          🎬 Movie Lover 🍿 | 📝 Emojee Reviewer 🎭✨ | 🌟 Sharing My Cinematic
          Emotions! 😍🎉 Welcome to my movie realm! 🎉 As a devoted film
          enthusiast, I express my cinematic experiences through captivating
          emojee reviews! 📝💖 From heartwarming to adrenaline-pumping moments,
          I&apos;ve got all the emojis to convey the magic of movies! 🎥✨ Join
          me on this emotive journey as we uncover cinematic treasures together!
          🏆🎬 Let&apos;s create a wonderland of emotions through movies and
          share our thoughts and recommendations! 🤗💬🍿
        </div>
      </div>
    </div>
  );
}

export default ProfileHeader;
