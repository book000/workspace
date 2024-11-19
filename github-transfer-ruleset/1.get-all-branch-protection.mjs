import { graphql } from "@octokit/graphql";
import fs from "fs";

// GitHub API トークンを設定
const token = fs.readFileSync("../github-token.txt", "utf8").trim();

// GraphQL クエリ
const query = `
query GetAllBranchProtectionRules($login: String!, $after: String) {
  {type}(login: $login) {
    repositories(first: 100, after: $after) {
      nodes {
        owner {
          login
        }
        name
        isArchived
        isFork
        branchProtectionRules(first: 10) {
          nodes {
            id
            pattern
            requiredApprovingReviewCount
            requiresStatusChecks
            requiresStrictStatusChecks
            requiresCodeOwnerReviews
            dismissesStaleReviews
            isAdminEnforced
            requiredStatusCheckContexts
          }
        }
      }
      pageInfo {
        endCursor
        hasNextPage
      }
    }
  }
}`;

async function fetchAllBranchProtectionRules(type, login) {
  let allBranchProtectionRules = [];
  let hasNextPage = true;
  let after = null;

  while (hasNextPage) {
    const response = await graphql(query.replace("{type}", type), {
      login,
      after,
      headers: {
        authorization: `token ${token}`,
      },
    }).catch((error) => {
      console.error(error);
      console.error(error.errors);
      process.exit(1);
    });

    const repositories = response[type].repositories;

    const repositoriesNodes = repositories.nodes;
    repositoriesNodes.forEach((repo) => {
      allBranchProtectionRules.push({
        owner: repo.owner.login,
        repository: repo.name,
        branchProtectionRules: repo.branchProtectionRules.nodes,
        isArchived: repo.isArchived,
        isFork: repo.isFork,
      });
    });

    hasNextPage = repositories.pageInfo.hasNextPage;
    after = repositories.pageInfo.endCursor;
  }

  return allBranchProtectionRules;
}

async function main() {
  const branchProtectionRulesBook000 = await fetchAllBranchProtectionRules(
    "user",
    "book000"
  );
  const branchProtectionRulesTomacheese = await fetchAllBranchProtectionRules(
    "organization",
    "tomacheese"
  );

  const branchProtectionRules = branchProtectionRulesBook000.concat(
    branchProtectionRulesTomacheese
  );

  // ディレクトリが存在しない場合は作成
  if (!fs.existsSync("data")) {
    fs.mkdirSync("data");
  }

  // JSON ファイルに書き出し
  fs.writeFileSync(
    "data/branch-protections.json",
    JSON.stringify(branchProtectionRules, null, 2)
  );
}

main().catch((error) => console.error(error));
