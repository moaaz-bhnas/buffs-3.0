import Container from "@/components/container/Container";
import { PageProps } from "../../../../.next/types/app/(authenticated)/[username]/page";
import { ServerApiClient } from "@/apis/server-api-client";
import Avatar from "@/components/avatar/Avatar";

export default async function page({ params }: PageProps) {
  const serverApiClient = new ServerApiClient();
  const userResult = await serverApiClient.getUserByUsername(params.username);
  if (userResult.isErr()) {
    return <Container>Oops, User not found</Container>;
  }
  return (
    <Container>
      <div className="flex">
        <Avatar avatarUrl={userResult.value.avatar}></Avatar>
        <h1> {userResult.value.displayName}</h1>
      </div>
    </Container>
  );
}
