import React from "react";

function Conversation() {
  return (
    <div className="flex flex-col w-full p-4 space-y-4">
      <div className="bg-gray-200 p-3 rounded-lg self-end max-w-2/3">
        <p className="text-black">Hi, how are you?</p>
      </div>
      <div className="bg-blue-500 p-3 rounded-lg self-start max-w-2/3">
        <p className="text-white">Hi</p>
      </div>
      <div className="bg-gray-200 p-3 rounded-lg self-end max-w-2/3">
        <p className="text-black">Have you watched the John Wick movies?</p>
      </div>
      <div className="bg-blue-500 p-3 rounded-lg self-start max-w-2/3">
        <p className="text-white">Yes, I have! I love those movies.</p>
      </div>
      <div className="bg-gray-200 p-3 rounded-lg self-end max-w-2/3">
        <p className="text-black">
          Keanu Reeves is amazing in those action scenes.
        </p>
      </div>
      <div className="bg-blue-500 p-3 rounded-lg self-start max-w-2/3">
        <p className="text-white">
          Absolutely! The choreography is so well done.
        </p>
      </div>
      <div className="bg-gray-200 p-3 rounded-lg self-end max-w-2/3">
        <p className="text-black">
          I also like the world-building and the Continental Hotel concept.
        </p>
      </div>
      <div className="bg-blue-500 p-3 rounded-lg self-start max-w-2/3">
        <p className="text-white">
          Definitely, it adds a unique depth to the story.
        </p>
      </div>
      <div className="bg-gray-200 p-3 rounded-lg self-end max-w-2/3">
        <p className="text-black">
          The choice of music in the movies is great too.
        </p>
      </div>
      <div className="bg-blue-500 p-3 rounded-lg self-start max-w-2/3">
        <p className="text-white">
          Absolutely, the soundtrack sets the perfect mood.
        </p>
      </div>
      <div className="bg-gray-200 p-3 rounded-lg self-end max-w-2/3">
        <p className="text-black">
          Do you think there will be more movies in the series?
        </p>
      </div>
      <div className="bg-blue-500 p-3 rounded-lg self-start max-w-2/3">
        <p className="text-white">
          I hope so! I can never get enough of John Wick's action.
        </p>
      </div>
    </div>
  );
}

export default Conversation;
