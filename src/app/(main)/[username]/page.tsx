import Container from "@/components/container/Container";
import ProfileHeader from "@/components/profile-header/ProfileHeader";
import FavoriteMovies from "@/components/favorite-movies/FavoriteMovies";
import { ServerApiClient } from "@/apis/server-api-client";
import { Metadata } from "next";
import taglineMessages from "@/utils/messages/taglineMessages";

type Props = {
  params: { username: string };
};

export function generateMetadata({ params }: Props): Metadata {
  return {
    title: `${params.username} | Buffs`,
    description: taglineMessages.default,
  };
}

export default async function page({ params }: Props) {
  const serverApiClient = new ServerApiClient();
  const userResult = await serverApiClient.getUserByUsername(params.username);
  if (userResult.isErr()) {
    return (
      <Container>
        <div>Oops, User not found</div>
      </Container>
    );
  }
  return (
    <main>
      <Container>
        {/* @ts-expect-error Async Server Component */}
        <ProfileHeader username={params.username} />
      </Container>
      <Container>
        <FavoriteMovies />
      </Container>
    </main>
  );
}
