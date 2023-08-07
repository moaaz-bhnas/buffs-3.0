import ReviewModal from './AddReviewModal';
import Link from 'next/link';
import UserAvatar from '../../avatar/UserAvatar';
import { Suspense } from 'react';
import AvatarSkeleton from '../../avatar/AvatarSkeleton';
import getServerUser from '@/helpers/auth/getServerUser';

type Props = {};

async function AddReviewSection({}: Props) {
  const userResult = await getServerUser();

  if (userResult.isErr()) {
    return <></>;
  }

  return (
    <section
      className='flex gap-x-2 rounded-md bg-white p-3 shadow-sm'
      aria-label='Write a review'>
      <Link href='/profile'>
        <Suspense fallback={<AvatarSkeleton />}>
          {/* @ts-expect-error Async Server Component */}
          <UserAvatar size={40} />
        </Suspense>
      </Link>
      <div className='flex-1'>
        <ReviewModal userDisplayName={userResult.value.displayName} />
      </div>
    </section>
  );
}

export default AddReviewSection;
