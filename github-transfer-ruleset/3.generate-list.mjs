import fs from "fs";

const results = JSON.parse(fs.readFileSync("data/filter-rule-exist-repos.json", "utf8"));

const list = results
  .map((result) => {
    return [
      result.owner,
      result.repository,
      result.branchProtectionRules[0].requiredStatusCheckContexts,
    ].join("\t");
  })
  .join("\n");

fs.writeFileSync("data/required-status-check-contexts.tsv", list);
