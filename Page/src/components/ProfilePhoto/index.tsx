import { ProfileContainer } from "./styles";

interface ProfilePhotoProps {
  name: string;
};

export const ProfilePhoto = ({ name }: ProfilePhotoProps) => {
  let formattedName: string[] | string = name.split(' ');
  formattedName = `${formattedName[0][0].toUpperCase() || 'U'}${formattedName[1][1].toUpperCase() || ''}`;

  return <ProfileContainer>
    <span>
      {formattedName}
    </span>
  </ProfileContainer>
};
