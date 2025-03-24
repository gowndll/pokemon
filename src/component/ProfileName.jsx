

const ProfileName = ({names}) => {
  const name = names?.map((item) => item.language.name === "ko" ? item.name : '');
  return name;
}

export default ProfileName;