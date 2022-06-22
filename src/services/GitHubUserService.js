const accountName = "arlabunakty";

export const fetchUser = async () => {
  const response = await fetch(`https://api.github.com/users/${accountName}`);
  const user = await response.json();
  return user;
};
