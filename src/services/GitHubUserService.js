const accountName = "Arlabunakty";

export const fetchUser = async () => {
  const response = await fetch(`https://api.github.com/users/${accountName}`);
  const user = await response.json();

  const responseEvents = await fetch(user.received_events_url);
  const events = await responseEvents.json();
  user.received_events = events.length;

  const responseRepositories = await fetch(user.repos_url);
  const repositories = await responseRepositories.json();
  user.forks = repositories
    .map((r) => r.forks_count)
    .reduce(function (previousValue, currentValue) {
      return previousValue + currentValue;
    }, 0);

  return user;
};
