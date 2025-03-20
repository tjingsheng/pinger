# Pinger

## Overview

Pinger is a lightweight solution for keeping certain free-tier services active by ensuring they receive regular activity. Some services automatically pause due to inactivity, causing issues during use.

Pinger is built to be deployed to [**AWS Lambda**](https://aws.amazon.com/lambda/) and automatically called called using [**AWS EventBridge Scheduler**](https://aws.amazon.com/eventbridge/scheduler/) at specified intervals to ping a given URL, preventing services from entering an idle or paused state.

## How It Works

1. **AWS Lambda Function**: A simple function using `axios` to send a request to a specified URL.
2. **AWS EventBridge**: Schedules the Lambda function to run at regular intervals.
3. **Environment Variables**: Uses an environment variable (`PING_URL`) to determine which service to ping.

## Deployment Steps

Before proceeding, ensure you have the following prerequisites:

- **AWS**: Able to deploy to [AWS Lambda](https://aws.amazon.com/lambda/) and [AWS EventBridge Scheduler](https://aws.amazon.com/eventbridge/scheduler/)
- **Node.js**: Download and install from [nodejs](https://nodejs.org/)
- **pnpm**: Download and install from [pnpm](https://pnpm.io/installation)

\* _pnpm is recommended, but you may use any package manager that supports `package.json` (e.g., npm, yarn)._

### 1. Install Dependencies

Run the following command to install dependencies:

```sh
pnpm install
```

### 2. Build the Project

Compile the project using:

```sh
pnpm build
```

### 3. Deploy to AWS Lambda

Set up your AWS Lambda function with the built file. Ensure the `PING_URL` environment variable is set in your Lambda configuration.

### 4. Configure AWS EventBridge Scheduler

Set up an AWS EventBridge Schedule to invoke the Lambda function at your desired intervals.

### 5. Enjoy

Once these steps are completed, your EventBridge Scheduler will trigger the Lambda function at the specified intervals. The Lambda function will then ping the designated URL, keeping your services active.
