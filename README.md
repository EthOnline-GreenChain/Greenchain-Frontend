Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS
- Blockscout SDK

## Blockscout SDK Integration

This project uses the Blockscout SDK to enhance the user experience with blockchain transaction notifications and transaction history features.

### Installation

The Blockscout SDK is already installed in the project. If you need to install it in another project:

```bash
npm install @blockscout/app-sdk
# or
yarn add @blockscout/app-sdk
```

### Features Used

#### 1. Transaction Notifications

We use the `useNotification` hook to show transaction status updates:

```typescript
import { useNotification } from "@blockscout/app-sdk";

function YourComponent() {
  const { openTxToast } = useNotification();
  const CHAIN_ID = "11155111"; // Sepolia testnet

  const handleShowToast = async (txHash: string) => {
    await openTxToast(CHAIN_ID, txHash);
  };
}
```

#### 2. Transaction History Popup

The transaction history popup shows all transactions for the connected wallet:

```typescript
import { useTransactionPopup } from "@blockscout/app-sdk";

function YourComponent() {
  const { openPopup } = useTransactionPopup();
  const CHAIN_ID = "11155111"; // Sepolia testnet

  const showTransactionHistory = () => {
    openPopup({ chainId: CHAIN_ID });
  };
}
```

### Configuration

The project uses:

- Network: Sepolia testnet (Chain ID: 11155111)
- Explorer URL: `https://grenchain-ethglobal.cloud.blockscout.com`

To view transaction details, use:

```typescript
const txLink = `${BLOCKSCOUT_URL}/tx/${transactionHash}`;
```

### Best Practices

1. Always wrap SDK calls in try-catch blocks
2. Use the correct chain ID (11155111 for Sepolia)
3. Implement loading states for SDK operations
4. Store explorer URLs in environment variables

For more information, visit:

- [Blockscout Documentation](https://docs.blockscout.com)
- [Blockscout SDK GitHub](https://github.com/blockscout/blockscout)

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/3779f1cc-8a46-4191-9fbe-a3a3f67b1bc7) and click on Share -> Publish.
