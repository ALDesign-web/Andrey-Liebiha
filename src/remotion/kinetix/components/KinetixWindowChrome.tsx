import React from "react";
import { KINETIX_COLORS, KINETIX_FONTS } from "../tokens";

interface KinetixWindowChromeProps {
  children: React.ReactNode;
  url?: string;
  activeNav?: string;
  sidebarItemProgress?: number;
}

const NAV_ITEMS = [
  { id: "Dashboard", icon: "gauge" },
  { id: "Campaigns", icon: "megaphone" },
  { id: "Analytics", icon: "chart" },
  { id: "Posts", icon: "posts" },
  { id: "Engagement", icon: "users" },
  { id: "Billing", icon: "card" },
  { id: "Settings", icon: "settings" },
] as const;

const NavIcon: React.FC<{ kind: string; active: boolean }> = ({
  kind,
  active,
}) => {
  const stroke = active ? KINETIX_COLORS.textPrimary : "#8b92a1";
  switch (kind) {
    case "gauge":
      return (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="12" r="9" stroke={stroke} strokeWidth="1.8" />
          <path
            d="M12 12L16.5 8.5"
            stroke={stroke}
            strokeWidth="1.8"
            strokeLinecap="round"
          />
        </svg>
      );
    case "megaphone":
      return (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
          <path
            d="M4 11V13C4 14.1 4.9 15 6 15H8L16 19V5L8 9H6C4.9 9 4 9.9 4 11Z"
            stroke={stroke}
            strokeWidth="1.8"
            strokeLinejoin="round"
          />
        </svg>
      );
    case "chart":
      return (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
          <path
            d="M4 19V5M4 19H20M7 14L11 10L15 13L19 7"
            stroke={stroke}
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
    case "posts":
      return (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
          <rect
            x="4"
            y="4"
            width="16"
            height="16"
            rx="3"
            stroke={stroke}
            strokeWidth="1.8"
          />
          <path
            d="M8 9H16M8 13H13"
            stroke={stroke}
            strokeWidth="1.8"
            strokeLinecap="round"
          />
        </svg>
      );
    case "users":
      return (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
          <circle cx="9" cy="8" r="3" stroke={stroke} strokeWidth="1.8" />
          <path
            d="M4 19C4 16 6.2 14 9 14C11.8 14 14 16 14 19"
            stroke={stroke}
            strokeWidth="1.8"
            strokeLinecap="round"
          />
          <path
            d="M16 11C17.7 11 19 9.7 19 8"
            stroke={stroke}
            strokeWidth="1.8"
            strokeLinecap="round"
          />
        </svg>
      );
    case "card":
      return (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
          <rect
            x="3"
            y="6"
            width="18"
            height="12"
            rx="2.5"
            stroke={stroke}
            strokeWidth="1.8"
          />
          <path d="M3 10H21" stroke={stroke} strokeWidth="1.8" />
        </svg>
      );
    default:
      return (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="12" r="3" stroke={stroke} strokeWidth="1.8" />
          <path
            d="M12 4V6M12 18V20M4 12H6M18 12H20M6.3 6.3L7.7 7.7M16.3 16.3L17.7 17.7M17.7 6.3L16.3 7.7M7.7 16.3L6.3 17.7"
            stroke={stroke}
            strokeWidth="1.6"
            strokeLinecap="round"
          />
        </svg>
      );
  }
};

/**
 * macOS dark-mode application chrome matching app.kinetix.studio/workspace/telemetry.
 */
export const KinetixWindowChrome: React.FC<KinetixWindowChromeProps> = ({
  children,
  url = "app.kinetix.studio/workspace/telemetry",
  activeNav = "Dashboard",
  sidebarItemProgress = 1,
}) => {
  return (
    <div
      style={{
        width: 1520,
        height: 880,
        borderRadius: 20,
        backgroundColor: KINETIX_COLORS.windowBg,
        border: `1px solid ${KINETIX_COLORS.borderStrong}`,
        boxShadow:
          "0 45px 120px rgba(0, 0, 0, 0.85), 0 0 0 1px rgba(255, 255, 255, 0.04), inset 0 1px 0 rgba(255, 255, 255, 0.12)",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        fontFamily: KINETIX_FONTS.sans,
        color: KINETIX_COLORS.textPrimary,
      }}
    >
      {/* Top macOS Title Bar */}
      <div
        style={{
          height: 52,
          padding: "0 20px",
          backgroundColor: "#0c0d11",
          borderBottom: `1px solid ${KINETIX_COLORS.borderSubtle}`,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexShrink: 0,
        }}
      >
        {/* Traffic Lights */}
        <div style={{ display: "flex", alignItems: "center", gap: 9, width: 180 }}>
          <div
            style={{
              width: 12,
              height: 12,
              borderRadius: "9999px",
              backgroundColor: "#ff5f57",
            }}
          />
          <div
            style={{
              width: 12,
              height: 12,
              borderRadius: "9999px",
              backgroundColor: "#febc2e",
            }}
          />
          <div
            style={{
              width: 12,
              height: 12,
              borderRadius: "9999px",
              backgroundColor: "#28c840",
            }}
          />
        </div>

        {/* Center URL Pill */}
        <div
          style={{
            height: 30,
            padding: "0 120px",
            borderRadius: 8,
            backgroundColor: "rgba(255, 255, 255, 0.035)",
            border: `1px solid ${KINETIX_COLORS.borderSubtle}`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontFamily: KINETIX_FONTS.mono,
            fontSize: 12,
            color: "#a1a8b3",
            letterSpacing: "0.01em",
          }}
        >
          {url}
        </div>

        <div style={{ width: 180 }} />
      </div>

      {/* App Header Bar */}
      <div
        style={{
          height: 64,
          padding: "0 28px",
          backgroundColor: KINETIX_COLORS.windowBg,
          borderBottom: `1px solid ${KINETIX_COLORS.borderSubtle}`,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexShrink: 0,
        }}
      >
        {/* Brand Identity */}
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div
            style={{
              width: 34,
              height: 34,
              borderRadius: 9,
              backgroundColor: "rgba(255, 114, 53, 0.12)",
              border: "1px solid rgba(255, 114, 53, 0.45)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path
                d="M12 3L21 12L12 21L3 12L12 3Z"
                stroke="#ff7235"
                strokeWidth="2.4"
              />
              <path d="M12 8.5L15.5 12L12 15.5L8.5 12L12 8.5Z" fill="#ff7235" />
            </svg>
          </div>
          <span
            style={{
              fontSize: 20,
              fontWeight: 600,
              letterSpacing: "-0.02em",
              color: KINETIX_COLORS.textPrimary,
            }}
          >
            Kinetix
          </span>
          <span
            style={{
              padding: "3px 8px",
              borderRadius: 5,
              backgroundColor: "rgba(255, 114, 53, 0.14)",
              border: "1px solid rgba(255, 114, 53, 0.35)",
              fontFamily: KINETIX_FONTS.mono,
              fontSize: 10,
              fontWeight: 600,
              letterSpacing: "0.08em",
              color: "#ff9d6e",
            }}
          >
            STUDIO
          </span>
        </div>

        {/* Right Utility Controls */}
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 7,
              padding: "6px 12px",
              borderRadius: 8,
              backgroundColor: "rgba(255, 255, 255, 0.04)",
              border: `1px solid ${KINETIX_COLORS.borderSubtle}`,
              fontSize: 13,
              fontWeight: 500,
              color: KINETIX_COLORS.textPrimary,
            }}
          >
            <span style={{ color: "#fbbf24" }}>⚡</span>
            <span>Upgrade</span>
          </div>
          <div
            style={{
              width: 26,
              height: 26,
              borderRadius: "9999px",
              border: "1.5px solid rgba(255, 255, 255, 0.35)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 13,
              color: KINETIX_COLORS.textSecondary,
            }}
          >
            ?
          </div>
        </div>
      </div>

      {/* Main Split Workspace */}
      <div style={{ flex: 1, display: "flex", minHeight: 0 }}>
        {/* Left Sidebar */}
        <aside
          style={{
            width: 268,
            padding: "20px 18px",
            borderRight: `1px solid ${KINETIX_COLORS.borderSubtle}`,
            backgroundColor: "#0a0b0f",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            flexShrink: 0,
          }}
        >
          <div>
            {/* Search Box */}
            <div
              style={{
                height: 38,
                padding: "0 12px",
                borderRadius: 9,
                backgroundColor: "#111319",
                border: `1px solid ${KINETIX_COLORS.borderSubtle}`,
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: 20,
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                  <circle
                    cx="11"
                    cy="11"
                    r="7"
                    stroke="#6b7280"
                    strokeWidth="2"
                  />
                  <path
                    d="M20 20L16.5 16.5"
                    stroke="#6b7280"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
                <span style={{ fontSize: 13, color: "#9ca3af" }}>Search...</span>
              </div>
              <span
                style={{
                  fontFamily: KINETIX_FONTS.mono,
                  fontSize: 11,
                  padding: "2px 6px",
                  borderRadius: 5,
                  backgroundColor: "rgba(255, 255, 255, 0.06)",
                  color: "#9ca3af",
                }}
              >
                ⌘K
              </span>
            </div>

            {/* Nav Items */}
            <nav style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              {NAV_ITEMS.map((item, idx) => {
                const isActive = item.id === activeNav;
                const itemDelay = idx * 0.08;
                const localOpacity = Math.max(
                  0,
                  Math.min(1, (sidebarItemProgress - itemDelay) / 0.35)
                );
                return (
                  <div
                    key={item.id}
                    style={{
                      height: 38,
                      padding: "0 12px",
                      borderRadius: 9,
                      display: "flex",
                      alignItems: "center",
                      gap: 11,
                      backgroundColor: isActive
                        ? "rgba(255, 255, 255, 0.06)"
                        : "transparent",
                      border: isActive
                        ? `1px solid ${KINETIX_COLORS.borderSubtle}`
                        : "1px solid transparent",
                      opacity: localOpacity,
                      translate: `${(1 - localOpacity) * -10}px 0px`,
                    }}
                  >
                    <NavIcon kind={item.icon} active={isActive} />
                    <span
                      style={{
                        fontSize: 13.5,
                        fontWeight: isActive ? 500 : 400,
                        color: isActive
                          ? KINETIX_COLORS.textPrimary
                          : "#9ca3af",
                      }}
                    >
                      {item.id}
                    </span>
                  </div>
                );
              })}
            </nav>
          </div>

          {/* Logout Footer */}
          <div
            style={{
              height: 38,
              padding: "0 12px",
              display: "flex",
              alignItems: "center",
              gap: 10,
              color: "#9ca3af",
              fontSize: 13.5,
            }}
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
              <path
                d="M9 21H5C4 21 3 20 3 19V5C3 4 4 3 5 3H9M16 17L21 12L16 7M21 12H9"
                stroke="#8b92a1"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span>Logout</span>
          </div>
        </aside>

        {/* Main Content Slot */}
        <main
          style={{
            flex: 1,
            padding: "24px 28px",
            display: "flex",
            flexDirection: "column",
            gap: 20,
            minWidth: 0,
            backgroundColor: KINETIX_COLORS.windowBg,
          }}
        >
          {children}
        </main>
      </div>
    </div>
  );
};
