import ChatsList from "@/components/chats-list/ChatsList";
import Conversation from "@/components/conversation/Conversation";
import React from "react";

function page() {
  return (
    <div className="flex">
      <ChatsList />
      <Conversation />
    </div>
  );
}

export default page;
