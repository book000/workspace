import fs from 'fs';

const branchProtections = fs.readFileSync(
  "data/branch-protections.json",
  "utf8"
);
const branchProtectionRules = JSON.parse(branchProtections);

const filterRuleExistRepos = branchProtectionRules.filter(repo => {
  return !repo.isFork && !repo.isArchived && repo.branchProtectionRules.length > 0;
})

if (!fs.existsSync('data')) {
  fs.mkdirSync('data');
}

fs.writeFileSync('data/filter-rule-exist-repos.json', JSON.stringify(filterRuleExistRepos, null, 2));