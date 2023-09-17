"use-client";

import { useEffect, useState } from "react";
import ModalContainer from "../modal/ModalContainer";
import { ServerApiClient } from "@/apis/server-api-client";
import { DBUser } from "@/interfaces/database/DBUser";
import { useAsyncFn } from "react-use";
import Link from "next/link";
import Avatar from "../avatar/Avatar";

type Props = {
  isOpen: boolean;
  close: () => void;
  likers: string[];
};

const serverApiClient = new ServerApiClient();

function LikesModal({ isOpen, close, likers }: Props) {
  const [users, setUsers] = useState<DBUser[]>([]);

  const [getUsersState, getUsers] = useAsyncFn(async (usersIds: string[]) => {
    const result = await serverApiClient.getUsersByIds(usersIds);

    if (result.isErr()) {
      throw new Error(result.error.errorMessage);
    }

    setUsers(result.value);
  });

  useEffect(() => {
    getUsers(likers);
  }, [likers]);

  return (
    <ModalContainer
      title="Likes"
      isOpen={isOpen}
      close={close}
      panelClassName="!max-w-sm max-h-96"
    >
      <ul className="space-y-2">
        {users.map((user) => (
          <li key={user._id} className="max-h flex items-center gap-2">
            <Link href={`/${user.username}`}>
              <Avatar avatarUrl={user.avatar} size={40} />
            </Link>
            <Link href={`/${user.username}`}>
              <p className="font-medium">{user.displayName}</p>
            </Link>
          </li>
        ))}
      </ul>
    </ModalContainer>
  );
}

export default LikesModal;
