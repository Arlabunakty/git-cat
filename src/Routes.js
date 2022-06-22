export const pathes = Object.freeze({
  repositories: "/",
  followers: "/followers",
  subscriptions: "/subscriptions",
  about: "/about",
});

export const names = Object.freeze({
  repositories: "Repositories",
  followers: "Followers",
  subscriptions: "Subscriptions",
  about: "About",
});

export default [
  {
    name: names.repositories,
    path: pathes.repositories,
    icon: "fa-code-branch",
  },
  { name: names.followers, path: pathes.followers, icon: "fa-users" },
  { name: names.subscriptions, path: pathes.subscriptions, icon: "fa-link" },
  { name: names.about, path: pathes.about, icon: "fa-user" },
];
