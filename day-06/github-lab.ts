interface GitHubUser {
  login: string;
  id: number;
  name: string | null;
  bio: string | null;
  public_repos: number;
}

function isGitHubUser(data: unknown): data is GitHubUser {
  if (typeof data !== "object" || data === null || Array.isArray(data)) {
    return false;
  }

  const user = data as Record<string, unknown>;

  return (
    typeof user.login === "string" &&
    typeof user.id === "number" &&
    (typeof user.name === "string" || user.name === null) &&
    (typeof user.bio === "string" || user.bio === null) &&
    typeof user.public_repos === "number"
  );
}

async function main() {
  const res = await fetch("https://api.github.com/users/menna-f708");

  console.log("Status:", res.status);
  console.log("OK:", res.ok);
  console.log("Status Text:", res.statusText);
  console.log("Content-Type:", res.headers.get("content-type"));

  console.log("Requests remaining:", res.headers.get("x-ratelimit-remaining"));

  if (!res.ok) {
    throw new Error(`GitHub request failed with status ${res.status}`);
  }

  const data: unknown = await res.json();

  if (!isGitHubUser(data)) {
    throw new Error("Invalid GitHub user response");
  }

  console.log("Username:", data.login);
  console.log("ID:", data.id);
  console.log("Public repositories:", data.public_repos);
  console.log("Name:", data.name ?? "No public name");
}

main().catch((error: unknown) => {
  console.error("Error:", error);
});

interface GitHubRepo {
  name: string;
  language: string | null;
  stargazers_count: number;
}

async function fetchMyRepos() {
  const url = new URL("https://api.github.com/users/menna-f708/repos");

  url.searchParams.set("sort", "updated");
  url.searchParams.set("per_page", "5");

  console.log("Repos URL:", url.toString());

  const res = await fetch(url);

  if (!res.ok) {
    throw new Error(`GitHub repos request failed: ${res.status}`);
  }

  const data: unknown = await res.json();

  if (!Array.isArray(data)) {
    throw new Error("Expected an array of repositories");
  }

  for (const item of data) {
    if (
      typeof item !== "object" ||
      item === null ||
      !("name" in item) ||
      typeof item.name !== "string" ||
      !("language" in item) ||
      !(typeof item.language === "string" || item.language === null) ||
      !("stargazers_count" in item) ||
      typeof item.stargazers_count !== "number"
    ) {
      throw new Error("Invalid repository data");
    }

    const repo: GitHubRepo = {
      name: item.name,
      language: item.language,
      stargazers_count: item.stargazers_count,
    };

    console.log(
      `${repo.name} | ${repo.language ?? "—"} | ⭐ ${repo.stargazers_count}`,
    );
  }
}

fetchMyRepos().catch((error: unknown) => {
  console.error("Error:", error);
});

async function searchRepos() {
  const query = "react language:typescript";

  const url = new URL("https://api.github.com/search/repositories");
  url.searchParams.set("q", query);
  url.searchParams.set("per_page", "5");

  console.log("Search URL:", url.toString());
  console.log("Encoded query:", url.searchParams.get("q"));

  const res = await fetch(url);

  if (!res.ok) {
    throw new Error(`GitHub search failed: ${res.status}`);
  }

  const data: unknown = await res.json();

  if (
    typeof data !== "object" ||
    data === null ||
    !("items" in data) ||
    !Array.isArray(data.items)
  ) {
    throw new Error("Invalid search response");
  }

  for (const item of data.items) {
    if (
      typeof item === "object" &&
      item !== null &&
      "full_name" in item &&
      typeof item.full_name === "string"
    ) {
      console.log(item.full_name);
    }
  }
}

const query = "cats & dogs";

const badUrl = "https://api.github.com/search/repositories?q=" + query;

console.log(badUrl);

const safeUrl = new URL("https://api.github.com/search/repositories");

safeUrl.searchParams.set("q", "cats & dogs");

console.log(safeUrl.toString());

searchRepos().catch((error: unknown) => {
  console.error("Error:", error);
});

interface GitHubUserSummary {
  login: string;
  id: number;
  public_repos: number;
}

const usernames = [
  "menna-f708",
  "this-user-does-not-exist-987654321",
  "octocat",
];

async function fetchUser(username: string): Promise<GitHubUserSummary | null> {
  try {
    const res = await fetch(
      `https://api.github.com/users/${encodeURIComponent(username)}`,
    );

    if (!res.ok) {
      throw new Error(`HTTP ${res.status}`);
    }

    const data: unknown = await res.json();

    if (
      typeof data !== "object" ||
      data === null ||
      !("login" in data) ||
      typeof data.login !== "string" ||
      !("id" in data) ||
      typeof data.id !== "number" ||
      !("public_repos" in data) ||
      typeof data.public_repos !== "number"
    ) {
      throw new Error("Invalid GitHub user response");
    }

    return {
      login: data.login,
      id: data.id,
      public_repos: data.public_repos,
    };
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Unknown error";

    console.error(`Failed to fetch "${username}": ${message}`);

    return null;
  }
}

async function fetchSeveralUsers() {
  const results = await Promise.all(
    usernames.map((username) => fetchUser(username)),
  );

  console.log("\n--- Users in requested order ---");

  results.forEach((user, index) => {
    if (user === null) {
      console.log(`${usernames[index]}: User unavailable`);
      return;
    }

    console.log(`${user.login} | ID: ${user.id} | Repos: ${user.public_repos}`);
  });
}

fetchSeveralUsers().catch((error: unknown) => {
  console.error("Unexpected error:", error);
});

export {};