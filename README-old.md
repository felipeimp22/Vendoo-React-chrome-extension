## Vendoo Technical Assessment

### Presentation instructions

In the final interview, you will be presenting your solution for this request.

Keep in mind that we expect this not to take too much of your time, we recommend you dedicate no more than 5 hours to this test and stop when you reach the limit.

The end goal is not to have a perfect solution (the further you can go the better) but rather to have an understanding of your thought process for solving the problem.

Please prepare a diagram, notes, videos, presentation, or anything you feel appropriate to show the hiring team how you think regarding your approach to the problem.
- You can send this material on the hatchway app or add the links on github while sending the pull requests.

It's a bonus if you document the possible risks and the problems you faced while working on this task.

If you are not able to complete the assessment until the end, please _propose alternative solutions for the problem and present which problems you faced that blocked you and what would be your next steps_, if you faced this in a real work scenario.

**This test intends to evaluate mostly your thought process and your problem-solving skills. Code is important, but we are looking for engineers to overcome industry-leading challenges.**

In the final interview, you will be presenting your solution for this request and we expect you to answer these questions:
- Why do you think this solution is viable/optimal/ideal?
- Are there any alternatives for the approach you have for the problem?


At the same time, we will evaluate:
- Your approach to overcome the request (Solution)
- Code
- Documentation (JSDoc, comments etc)

### Problem Overview

A common problem for a new user when coming to a new platform is to bring all its information into the new software. To make it easy, we want to start adding a new feature to help users to import their existing items from other marketplaces to our software.

### User story

This is the user story we expect to be done by you.

```
Feature: Import user inventory
   Scenario: A user that wants to sync its own inventory items from Grailed marketplace
      GIVEN A existing user on Grailed marketplace
         AND the user has X listed items
      WHEN a user storename is typed on the input field
         AND the user submits the form
      THEN users items should be displayed in the table
         AND all the X listed items should be seen
```

Example screenshoot

![CleanShot 2023-05-04 at 10 30 27@2x](https://user-images.githubusercontent.com/707561/236219991-cfa7925b-414f-4460-9147-e8223060e381.png)

To open the sync page, Click on the extension icon that will be added after installing it following the instructions below.

### Instructions

To run this project, follow this steps:

1. Run `yarn install` or `npm i` (check your node version >= 16.6, recommended >= 18)
2. Run `yarn start` or `npm start`
3. Load Extension on Chrome
   1. Open Chrome browser (or chrome based browsers)
   2. Access `chrome://extensions`
   3. Check "Developer mode" toggle (Top-right corner)
   4. Click on "Load unpacked" extension
   5. Select the `dist` folder in this project (after `yarn start` or `yarn run build`)

To build the extension, Just run `yarn build` or `npm run build`.

For this assessment, you can ignore the directories below, they won't be part of the assessment.

- ./utils
- ./test-utils

### Reference

Chrome extension messaging doc: https://developer.chrome.com/docs/extensions/mv3/messaging/

Chrome extension webrequests doc: https://developer.chrome.com/docs/extensions/reference/webRequest/

---

This project was based on https://github.com/Jonghakseo/chrome-extension-boilerplate-react-vite
