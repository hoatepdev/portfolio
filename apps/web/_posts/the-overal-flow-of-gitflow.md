---
title: "The overall flow of Gitflow"
excerpt: "Gitflow is a legacy Git workflow, that is the strategy for managing Git branches. Gitflow is an alternative Git branching model that defines a strict branching structure around a project release"
coverImage: "/images/banner/posts/the-overal-flow-of-gitflow.png"
date: "2025-05-01"
author:
  name: hoatepdev
  picture: "https://github.com/hoatepdev.png"
ogImage:
  url: "/images/banner/posts/the-overal-flow-of-gitflow.png"

publishedAt: "2022-10-12"
category: Project
tags:
  - git
  - github
  - tutorial
  - productivity
summary: ""
banner: /images/banner/posts/the-overal-flow-of-gitflow.png
alt: ""
mathjax: false
---

## Introduce

Gitflow is a legacy Git workflow, that is the strategy for managing Git branches. Gitflow is an alternative Git branching model that defines a strict branching structure around a project release.
It was first published and made popular by [Vincent Driessen at nvie.](https://nvie.com/posts/a-successful-git-branching-model/).
Compared to trunk-based development, Gitflow has numerous branches and larger commits. Gitflow can be used for projects with scheduled release cycles and for the DevOps process CI/CD. It assigns particular roles to different branches and defines how and what they should activities.

## Overall

Gitflow is just an abstract idea of the Git flow. It shows how to set up a different types of branches and how to merge them.
In addition, you can configure the CI/CD on each of the different git repositories: GitHub, GitLab to automatically deployed features when there is a change in code on branches.

![Illustration Gitflow](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/qmezinc9z6299z1vaeim.png)

- **Master**: master branch is available in git and the branch contains the application initialization code and the version that is ready to release (put tags on each version). Normally, configure for team lead impacts to branches.

![Master branch](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/dguu4q0eeiqysbuh1zol.png)

- **Hotfix**: Based on the master branch to quickly fix bugs in the end product or add specific config only available on the production environment.

* Split from branch: Master
* Merge to branch: Master & Develop
* Naming convention: hotfix-\*

![Hotfix branch](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/ohth7icp6f4bgcsrko3c.png)

When needing to change the configuration or hotfix in a production environment, team lead will create branches based on the master branch for hotfix. As soon as the fix is complete, merged into both master and develop branches (usually will not be changed directly source code on master branch, so you have to do this way), and master should be tagged with an updated version number. Finally, delete the hotfix branch.

Having a dedicated line of development for bug fixes lets your team handle issues without interrupting the rest of workflow or waiting for the next release cycle.

- **Release**: Software needs to be created for final testing before releasing the product so that users can use it.

* Split from branch: Develop
* Merge to branch: Master
* Naming convention: release-\*

![Release branch](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/4hxyknusotgpjf9u8qa8.png)

Tasks that need to be released will be split from the develop branch. After the tester confirms completion, put the release tag and merge it into the master branch then delete that branch.

- **Develop**: The develop branch is the central branch of the development. The origin/develop branch is considered the master branch with the HEAD reflecting the latest changes in development in preparation for the next release.

![Develop branch](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/tunovf7cdwr6e0uncyb6.png)

Initialized from master branches to save all the change history of the source code. Develop branches is the merge code of all feature branches.
When the dev team completes all the features of a topic, the teamlead reviews the app and merges it to the release branches.

- **Feature**: Based on Develop branches. Every time we develop a new feature we need to create a branch to compile the source code for each feature.

* Split from branch: Develop
* Merge to branch: Develop
* Naming convention: feature/\* (except related to keywords master, develop, release, hotfix)

![Feature branch](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/9pgw1i573yku2tl3bv70.png)

When there is a new feature the dev member creates a new branch based on the Develop branches to code for that feature. After the code is done, the dev makes a merge request to the develop branches for team lead review and merges it back into the Develop branches.

Happy coding!
