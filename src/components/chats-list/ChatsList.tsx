import React from "react";
import Avatar from "../avatar/Avatar";
import { CheckCircleIcon } from "@heroicons/react/24/solid";
const users = [
  {
    id: 1,
    name: "diana",
    avatarUrl: "https://i.pravatar.cc/150?img=1",
    active: false,
  },
  {
    id: 2,
    name: "ali",
    avatarUrl: "https://i.pravatar.cc/150?img=2",
    active: true,
  },
  {
    id: 3,
    name: "John",
    avatarUrl: "https://i.pravatar.cc/150?img=3",
    active: false,
  },
  {
    id: 4,
    name: "moaaz",
    avatarUrl: "https://i.pravatar.cc/150?img=4",
    active: true,
  },
  {
    id: 5,
    name: "7oka",
    avatarUrl: "https://i.pravatar.cc/150?img=5",
    active: true,
  },
  {
    id: 6,
    name: "ro2a",
    avatarUrl: "https://i.pravatar.cc/150?img=6",
    active: true,
  },
  {
    id: 7,
    name: "salah",
    avatarUrl: "https://i.pravatar.cc/150?img=7",
    active: false,
  },
  {
    id: 8,
    name: "tofy",
    avatarUrl: "https://i.pravatar.cc/150?img=8",
    active: true,
  },
];

function ChatsList() {
  return (
    <div className="py-7 lg:w-1/3 border-r-2">
      <div className="flex justify-center">
        <h1 className="text-2xl mb-5 font-medium  ">Inbox</h1>
      </div>
      <hr />
      <ul>
        {users.map((user: any) => {
          return (
            <li
              key={user.id}
              className="flex p-2 items-center gap-3 hover:bg-slate-300 duration-300 cursor-pointer">
              <Avatar avatarUrl={user.avatarUrl} size={70} />
              <div>
                <div className="font-semibold">{user.name}</div>
                {user.active ? (
                  <div className="flex gap-1 m-auto text-sm">
                    <CheckCircleIcon className="w-4 text-green-800" />
                    active now
                  </div>
                ) : (
                  ""
                )}
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default ChatsList;
