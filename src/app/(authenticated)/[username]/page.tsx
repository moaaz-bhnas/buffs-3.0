import Container from "@/components/container/Container";
import ProfileHeader from "@/components/profile-header/ProfileHeader";
import FavoriteMovies from "@/components/favorite-movies/FavoriteMovies";
import { ServerApiClient } from "@/apis/server-api-client";

export default async function page({
  params,
}: {
  params: { username: string };
}) {
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
