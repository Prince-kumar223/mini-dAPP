# Decentralized Feedback System

A mini decentralized application built with a React/Vite frontend and a Stellar Soroban smart contract. Users can connect a Freighter wallet, submit anonymous feedback, and fetch feedback by ID through a clean Web3 interface.

## Live Links

- Live demo: https://mini-d-app-red.vercel.app/
- Demo video: https://youtu.be/aB2SG5ilkYg?si=oYdSYFs9Y0-9sESs
- GitHub repository: https://github.com/Prince-kumar223/mini-dAPP
- Test output evidence: [docs/test-output.md](docs/test-output.md)

## NOTE :- FOR DEMO AND DEMO VIDEO LINK , SCREENSHORT GO TO THE LAST PLEASE.

## Features

- Connect Freighter wallet and display connected account details.
- Submit feedback from the frontend with loading, success, and validation states.
- Fetch feedback by numeric ID with local caching for repeated lookups.
- Soroban smart contract stores feedback entries by auto-incremented ID.
- Rust test suite covers creation, retrieval, invalid IDs, and multiple feedback entries.

## Tech Stack

- Frontend: React, Vite, Tailwind CSS, lucide-react
- Wallet: Freighter Wallet API
- Blockchain: Stellar Soroban smart contract in Rust
- Tests: Rust `cargo test`

## Project Structure

```text
mini dAPP/
|-- contract/
|   |-- src/
|   |   |-- lib.rs
|   |   `-- test.rs
|   |-- test_snapshots/
|   |-- Cargo.toml
|   `-- Cargo.lock
|-- frontend/
|   |-- public/
|   |-- src/
|   |   |-- components/
|   |   |-- App.jsx
|   |   |-- index.css
|   |   `-- main.jsx
|   |-- package.json
|   |-- vite.config.js
|   `-- tailwind.config.js
|-- docs/
|   `-- test-output.md
|-- SUBMISSION_CHECKLIST.md
`-- README.md
```

## Prerequisites

- Node.js and npm
- Rust toolchain
- Soroban CLI: `cargo install --locked soroban-cli`
- Freighter browser wallet

## Run Locally

Install and start the frontend:

```bash
cd frontend
npm install
npm run dev
```

Run the production build:

```bash
cd frontend
npm run build
```

Run lint checks:

```bash
cd frontend
npm run lint
```

Run smart contract tests:

```bash
cd contract
cargo test
```

## Smart Contract

The contract exposes two methods:

- `create_feedback(text: String) -> u32`: stores feedback and returns a unique ID.
- `get_feedback(id: u32) -> String`: returns the stored feedback or `Feedback not found`.

To build and deploy with Soroban:

```bash
cd contract
soroban contract build
soroban contract deploy --wasm target/wasm32-unknown-unknown/release/feedback_contract.wasm --source <your-identity> --network testnet
```

Save the returned contract ID and wire it into the frontend when replacing the current mocked transaction calls with live contract invocation.

## Deployment

Recommended Vercel settings:

- Root Directory: `frontend`
- Framework Preset: Vite
- Build Command: `npm run build`
- Output Directory: `dist`

After deployment, replace the TODO live demo link at the top of this README.

## Test Status

Latest local verification:

```text
cargo test: 3 passed, 0 failed
npm run lint: passed
npm run build: passed
```

For the submission screenshot requirement, take a screenshot of the terminal after running `cargo test` and add it to the README or upload it with the submission assets.

## Demo Video Script

1. Show the deployed app and title.
2. Connect Freighter wallet and show the connected state.
3. Enter feedback and click Create Feedback.
4. Show the success state and generated feedback ID.
5. Fetch that feedback ID and show the displayed feedback.
6. Fetch the same ID again to mention the cached lookup behavior.

## Submission Checklist

See [SUBMISSION_CHECKLIST.md](SUBMISSION_CHECKLIST.md) for the final pre-submit checklist.

## SUBMISSION REQUIREMENTS:-

## DEMO VIDEO LINK:- https://youtu.be/aB2SG5ilkYg?si=oYdSYFs9Y0-9sESs

 ## <video controls src="Stellar_lvl_3_demo_video.mp4" title="Title"></video>

## DEPLOYED LINK :- https://mini-d-app-red.vercel.app/
## Screenshot: test output showing 3+ tests passing:-
![alt text](<Screenshot 2026-04-26 230602.png>)