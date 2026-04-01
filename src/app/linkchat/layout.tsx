import "./linkchat.css";
import LinkChatHeader from "./components/LinkChatHeader";
import LinkChatTabs from "./components/LinkChatTabs";

export default function LinkChatLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="linkchat-layout">
      <LinkChatHeader />
      <LinkChatTabs />
      <div className="linkchat-content">{children}</div>
    </div>
  );
}
