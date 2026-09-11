# SmartYarn Assist

Create a complete, modern and professional college project website called:

“SmartYarn AI – AI-Assisted Automatic Yarn Change System for Powerloom”

PROJECT PURPOSE:

The project addresses a common problem in powerloom work: manually changing the yarn/warp when the yarn needs replacement can be difficult, time-consuming and may interrupt production. The proposed system uses AI-assisted yarn condition detection and provides a guided yarn-change assistance workflow.

IMPORTANT:

This is a SOFTWARE DEMONSTRATION for a college project. Do not claim that the website directly controls a real powerloom machine. The automatic yarn-change process should be simulated safely inside the website.

BUILD A FULLY WORKING WEBSITE WITH THESE PAGES:

1. HOME PAGE

- Project title: SmartYarn AI

- Subtitle: AI-Assisted Automatic Yarn Change System for Powerloom

- Short explanation of the problem and solution

- Attractive powerloom/yarn themed hero section

- “Start AI Detection” button

- “View Dashboard” button

- Project objectives section

- Benefits section

2. AI YARN DETECTION PAGE

Create an AI-style yarn analysis interface.

Features:

- Upload yarn image

- Drag and drop image area

- Preview uploaded image

- “Analyse Yarn” button

- Show loading/analysing animation

- Show result after analysis:

  - Normal Yarn

  - Yarn Change Required

- Show confidence percentage

- Show status card

- Show recommendation

For this college demo, if no real machine-learning model is connected, use a clearly labelled DEMO AI analysis so the website works immediately. Do not falsely claim that a real trained AI model is running.

Create a reusable function/service such as:

analyzeYarnImage()

It should be easy to replace the demo logic with a real trained AI/ML model API later.

Include sample/demo images or placeholders so the evaluator can test the website even without uploading an image.

3. YARN CHANGE ASSISTANCE PAGE

When “Yarn Change Required” is detected, show a guided assistance workflow.

Create 6 simple safe steps:

Step 1 – Stop the loom safely

Step 2 – Confirm that yarn replacement is required

Step 3 – Remove the depleted yarn according to the machine procedure

Step 4 – Position the replacement yarn

Step 5 – Verify yarn path and tension

Step 6 – Resume operation after safety confirmation

Show:

- Progress bar

- Current step

- Next button

- Previous button

- Completion percentage

- Final “Yarn Change Completed” message

Add a safety note:

“Follow the powerloom manufacturer’s operating procedure and allow only trained operators to perform physical yarn replacement.”

This is only a software simulation and must not provide dangerous machine-control instructions.

4. DASHBOARD PAGE

Create a professional dashboard showing:

- Total yarn analyses

- Normal yarn detections

- Yarn change required detections

- Average confidence

- Recent analysis history

- Detection status cards

- Simple charts/visual statistics

Store demo analysis history in browser localStorage so the dashboard updates when the user performs analyses.

5. ABOUT / PROJECT PAGE

Include:

- Problem Statement

- Existing Problem

- Proposed Solution

- Objectives

- Methodology

- Technologies Used

- Expected Outcome

- Future Scope

- Conclusion

FUTURE SCOPE:

- Real-time camera monitoring

- Real trained image-classification model

- IoT integration

- Powerloom sensor integration

- Automatic alert system

- Industrial-scale deployment

DESIGN:

- Professional industrial technology theme

- Navy/dark blue/cyan style

- Clean modern cards

- Yarn/powerloom related illustrations or suitable royalty-free visual placeholders

- Smooth animations

- Responsive design

- Mobile and laptop friendly

- Professional typography

- Attractive navbar and footer

- Use icons where appropriate

NAVBAR:

Home

AI Detection

Yarn Assistance

Dashboard

About

IMPORTANT FUNCTIONAL REQUIREMENTS:

- All navigation buttons must work.

- All pages/routes must work.

- “Analyse Yarn” must actually work.

- Image upload and preview must work.

- Detection results must appear correctly.

- Dashboard statistics must update.

- Assistance steps must work with Next/Previous buttons.

- No dead buttons.

- No broken links.

- No empty pages.

- Include a Demo Mode so the complete project can be demonstrated without any external API or hardware.

- Make the project ready to run immediately.

TECHNOLOGY:

Use React + TypeScript + Tailwind CSS with a clean component-based structure.

Use browser localStorage for demo data.

Keep the architecture simple and suitable for a college project.

ALSO CREATE:

- A README/documentation section explaining the project

- Problem statement

- Objectives

- Modules

- Technology stack

- How the AI demo works

- Future scope

- How a real ML model can later replace the demo analysis

MOST IMPORTANT:

Make the website look like a real working AI-powered industrial application, but clearly treat the yarn analysis and automatic yarn change as a safe software demonstration rather than direct control of a real powerloom.

After creating the project, make sure it is fully functional and visually polished.

This project was built with [Lovable](https://lovable.dev).

**Live app**: https://smartyarn-loom-ai.lovable.app

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/9a551841-ff8a-4bca-9f7f-b9c38f4ba52c).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
