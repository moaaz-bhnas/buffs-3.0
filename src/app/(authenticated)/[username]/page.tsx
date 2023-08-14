import Container from "@/components/container/Container";
import ProfileHeader from "@/components/profile-header/ProfileHeader";
import FavoriteMovies from "@/components/favorite-movies/FavoriteMovies";

export default async function page({
  params,
}: {
  params: { username: string };
}) {
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
