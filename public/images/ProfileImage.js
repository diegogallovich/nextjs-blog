import Image from 'next/image';

const ProfileImage = ({
  name,
  height,
  width,
  className,
  priority = false,
}) => (
  <Image
    priority={priority}
    className={className}
    src='/images/profile.jpg'
    height={height}
    width={width}
    alt={name}
  />
);

export default ProfileImage;
