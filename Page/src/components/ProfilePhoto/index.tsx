import { ProfileContainer } from "./styles";

interface ProfilePhotoProps {
  name: string;
};

export const ProfilePhoto = ({ name }: ProfilePhotoProps) => {
  let formattedName: string[] | string = name.split(' ');
  formattedName = 
    `${formattedName[0] ? formattedName[0][0].toUpperCase() : 'U'}`
    +`${formattedName[1] ? formattedName[1][0].toUpperCase() : ''}`;

  return <ProfileContainer data-testid="profile-container">
    <span data-testid="profile-name">
      {formattedName}
    </span>
  </ProfileContainer>
};
