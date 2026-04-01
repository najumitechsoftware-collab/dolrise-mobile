
import ChatsTab from "./tabs/ChatsTab";

export default function LinkChatPage() {
  // 🔒 Feature flag – boye LinkChat a production
  if (process.env.NEXT_PUBLIC_ENABLE_LINKCHAT !== "true") {
    return null;
  }

  return <ChatsTab />;
}
