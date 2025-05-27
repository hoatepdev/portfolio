---
title: "Work multiple accounts git"
publishedAt: "2023-12-02"
category: Project
tags:
  - git
  - github
  - tutorial

summary: "Work multiple accounts git - super simple and effective"
banner: /images/banner/posts/work-multiple-accounts-git.png
alt: "Cover image for Work multiple accounts git"
mathjax: false
---

Let's imagine the scenario: you've just joined a new company and need to install a new Git account on your machine to access the company repository. You also have a personal project and want to use 2 git accounts for personal and company. This is when you realize that it is essential to know how to safely manage multiple Git configurations on the same machine. Fortunately, this is an article for you.

Let's suppose I have two GitHub accounts, this is @personal and @company. Now I want to set up my Macbook to easily talk to both the GitHub accounts.

**Steps:
Step 1: Create SSH keys for all accounts
Step 2: Report to the ssh-agent
Step 3: Add SSH public key to the GitHub
Step 4: Create a configure file and make entries host
Step 5: Clone GitHub repositories
Step 6: Configure the Git information file for each folder**

![Image description](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/pqj1o5ntfz78kracqzay.png)

## Step 1. Create SSH keys for all accounts:

First, make sure you currently directory in your .ssh folder

```
cd ~/.ssh
```

Syntax generates SSH key:

```
ssh-keygen -t ed25519 -b 4096 -C "your_personal_email@example.com" -f <personal_key>
```

explain options:

-t: "Type" - algorithm. ed25519 this is an algorithm added in OpenSSH, recommended for security and performance.
-b: "Bit" - number of bits in the key.
-C: "Comment" - Changes comment for a key file. It can be anything but should be an email associated with your account.
-f: "File" - path where the key is stored.

Execute each command:

```
ssh-keygen -t ed25519 -C "personal@example.com" -f ~/.ssh/id_personal

ssh-keygen -t ed25519 -C "company@example.com" -f ~/.ssh/id_company
```

After executing your command, the terminal will ask for a passphrase, leave it empty and process.

In the .ssh folder id_personal, id_personal_sub, id_company, id_company_sub

## Step 2. Report to the ssh-agent:

ssh-agent is a program that keeps track of identity keys and their passphrases. Make sure the ssh-agent is running and add your key

Syntax check ssh-agent is running and add your key

```
eval "$(ssh-agent -s)" && \
ssh-add -K ~/.ssh/<your_key>
```

Explain options:
-K: store the passphrase in your keychain

Execute each command:

```
eval "$(ssh-agent -s)"
ssh-add -K ~/.ssh/id_personal
ssh-add -K ~/.ssh/id_company
```

## Step 3. Add SSH public key to the GitHub:

Add the newly created public key to the corresponding GitHub accounts.

1. Copy public key:
   You can do it 1 of 2 ways. Open id_personal.pub file and manually copy or use the command:

```
pbcopy < ~/.ssh/id_personal.pub
```

2. Paste the public key on GitHub

- Sign in account personal@example.com
- Goto Settings > SSH and GPG keys > New SSH Key
- Paste your key and enter the title key

Repeat this process for id_company.pub

## Step 4. Create a configure file and make entries host:

You need to create a config file for SSH to specify the different host and SSH keys for each GitHub account.
Command create a config file

```
touch ~/.ssh/config
```

Open a config file and add the following lines for each GitHub account

```
Host github.com-pers
    HostName github.com
    User git
    IdentityFile ~/.ssh/id_personal

Host github.com-company
    HostName github.com
    User git
    IdentityFile ~/.ssh/id_company
```

## Step 5. Clone GitHub repositories:

Next, you need to clone the repositories you want to work. Follow these steps:

Create new a personal folder and open the terminal here. Use the command for clone repo:

```
git clone git@github.com-account1:<account1-username>/<repository-name>.git
```

Explain options:
github.com-account1: defined in the configuration file ssh
account1-username: your account GitHub username
repository-name: name of repo you want to clone

Execute command:

```
git clone git@github.com-pers:personal-acc/repo-template.git
```

Repeat this process: create a company folder and clone the repository to the company folder

Execute command:

```
git clone git@github.com-company:company-acc/repo-template.git
```

## Step 6. Configure the Git information file for each folder:

Note: use version git 2.13 or higher

Create .gitconfig file

```
touch ~/.gitconfig
```

Open a .gitconfig file and add the following lines

```
# ~/.gitconfig
[user]
    name = hoatepdev
    email = hoanguyentrandev@gmail.com

[includeIf "gitdir:~/personal/"]
path = ~/personal/.gitconfig.personal

[includeIf "gitdir:~/company/"]
path = ~/company/.gitconfig.company

[core]
excludesfile = ~/.gitignore      # valid everywhere
```

Open a personal folder, create a .gitconfig.personal file and add the command

```
[user]
    name = username-personal
    email = personal@example.com
```

Similarly, create a .gitconfig.company file in a company folder, open it and add the command.

```
[user]
    name = username-company
    email = company@example.com
```

We are done!

## Conclusion 🥰

This guide has covered how to work with multiple accounts using SSH. It has also covered how to push code to various GitHub accounts with the corresponding Git account from the same machine.
