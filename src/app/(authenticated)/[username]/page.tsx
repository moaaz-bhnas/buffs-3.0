import Container from "@/components/container/Container";
import { PageProps } from "../../../../.next/types/app/(authenticated)/layout";
import { ServerApiClient } from "@/apis/server-api-client";
import Avatar from "@/components/avatar/Avatar";
export default async function page({ params }: PageProps) {
  const serverApiClient = new ServerApiClient();
  const userResult = await serverApiClient.getUserByUsername(params.username);
  console.log(userResult);
  if (userResult.isOk()) {
    return (
      <Container>
        <div className='flex'>
          <Avatar avatarUrl={userResult.value[0].avatar}></Avatar>
          <h1> {userResult.value[0].displayName}</h1>
        </div>
      </Container>
    );
  }
  if (userResult.isErr()) {
    return <Container>Oops, User not found</Container>;
  }
}

// import Avatar from "@/components/avatar/Avatar";
// // import { ServerApiClient } from "@/apis/server-api-client";
// import getServerUser from "@/helpers/auth/getServerUser";
import Image from "next/image";

// export default async function Profile(username: string) {
//   const userResult = await getServerUser();

//   if (userResult.isErr()) {
//     return <></>;
//   }

//   return (
//     <div>
//       <Container>
//         <Avatar avatarUrl={userResult.value.avatar} />
//         {userResult.value.displayName}
//       </Container>
//     </div>
//   );
// }
