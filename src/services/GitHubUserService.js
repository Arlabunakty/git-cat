const accountName = "Arlabunakty";

export async function fetchUser() {
  const response = await fetch(`https://api.github.com/users/${accountName}`);
  const user = await response.json();

  const responseEvents = await fetch(user.received_events_url);
  const events = await responseEvents.json();
  user.received_events = events.length;

  return user;
}

export async function fetchUserRepositories(user) {
  const response = await fetch(user.repos_url);
  const repositories = await response.json();
  return repositories;
}

export async function fetchUserFollowers(user) {
  const response = await fetch(user.followers_url);
  const followers = await response.json();
  return followers;
}

export async function fetchUserSubscriptions(user) {
  const response = await fetch(user.subscriptions_url);
  const subscriptions = await response.json();
  return subscriptions;
}
