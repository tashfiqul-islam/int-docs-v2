"use client";

import {
  Battery,
  BookmarkIcon,
  ChevronLeft,
  ChevronRight,
  Download,
  Globe,
  History,
  Home,
  Lock,
  Maximize2,
  Minimize2,
  MoreHorizontal,
  Plus,
  RotateCcw,
  Search,
  Settings,
  Shield,
  Square,
  Star,
  StarOff,
  Volume2,
  Wifi,
  X,
} from "lucide-react";
import Image from "next/image";
import { useTheme } from "next-themes";
import type React from "react";
import { useEffect, useState } from "react";
import homeDark from "@/app/assets/swags/home_dark.webp";
import homeLight from "@/app/assets/swags/home_light.webp";
import { Badge } from "@/app/components/ui/badge";
import { Button } from "@/app/components/ui/button";
import { Card } from "@/app/components/ui/card";
import { Input } from "@/app/components/ui/input";
import { Separator } from "@/app/components/ui/separator";
import { cn } from "@/lib/utils";

interface Tab {
  id: string;
  title: string;
  url: string;
  favicon?: string;
  isActive: boolean;
  isLoading: boolean;
}

interface Bookmark {
  id: string;
  title: string;
  url: string;
  favicon?: string;
}

interface HistoryItem {
  id: string;
  title: string;
  url: string;
  timestamp: Date;
  favicon?: string;
}

interface BrowserProps {
  image?: string;
  initialUrl?: string;
  initialTabs?: Partial<Tab>[];
  theme?: "light" | "dark" | "system";
  showWindowControls?: boolean;
  showBookmarksBar?: boolean;
  showStatusBar?: boolean;
  className?: string;
  enableTabManagement?: boolean;
  enableBookmarks?: boolean;
  enableHistory?: boolean;
  enableDownloads?: boolean;
  enableSettings?: boolean;
  maxTabs?: number;
  customBookmarks?: Bookmark[];
  customHistory?: HistoryItem[];
  onNavigate?: (url: string, tabId: string) => void;
  onTabCreate?: (tab: Tab) => void;
  onTabClose?: (tabId: string) => void;
  onTabSwitch?: (tabId: string) => void;
  onBookmarkToggle?: (url: string, isBookmarked: boolean) => void;
  onDownload?: (url: string) => void;
  renderContent?: (url: string, isLoading: boolean) => React.ReactNode;
  customFavicons?: Record<string, string>;
  openLinksInNewTab?: boolean;
  autoFocusAddressBar?: boolean;
  simulateLoading?: boolean;
  loadingDuration?: number;
}

export function Browser({
  image,
  initialUrl = "https://app.fieldnation.com/integrations/fieldservices",
  initialTabs,
  showWindowControls = false,
  showBookmarksBar = false,
  showStatusBar = true,
  className,
  enableTabManagement = false,
  enableBookmarks = true,
  enableHistory = true,
  enableDownloads = true,
  enableSettings = true,
  maxTabs = 10,
  customBookmarks,
  customHistory,
  onNavigate,
  onTabCreate,
  onTabClose,
  onTabSwitch,
  onBookmarkToggle,
  onDownload,
  renderContent,
  autoFocusAddressBar = false,
  simulateLoading = true,
  loadingDuration = 1000,
}: BrowserProps = {}) {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Use theme-aware images if image prop is not provided
  const displayImage =
    image ??
    (mounted && resolvedTheme === "dark" ? homeDark.src : homeLight.src);
  const [tabs, setTabs] = useState<Tab[]>(() => {
    if (initialTabs && initialTabs.length > 0) {
      return initialTabs.map((tab, index) => ({
        id: tab.id || Date.now().toString() + index,
        title: tab.title || "New Tab",
        url: tab.url || initialUrl,
        favicon: tab.favicon,
        isActive: index === 0,
        isLoading: false,
      }));
    }
    return [
      {
        id: "1",
        title: "New Tab",
        url: initialUrl,
        isActive: true,
        isLoading: false,
      },
    ];
  });

  const [currentUrl, setCurrentUrl] = useState(initialUrl);
  const [inputUrl, setInputUrl] = useState(initialUrl);
  const [isSecure, setIsSecure] = useState(true);
  const [canGoBack, setCanGoBack] = useState(false);
  const [canGoForward, setCanGoForward] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [showBookmarks, setShowBookmarks] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [downloadProgress, setDownloadProgress] = useState(0);
  const [isDownloading, setIsDownloading] = useState(false);

  const [bookmarks] = useState<Bookmark[]>(
    customBookmarks || [
      {
        id: "1",
        title: "Google",
        url: "https://www.google.com",
        favicon: "🔍",
      },
      { id: "2", title: "GitHub", url: "https://github.com", favicon: "🐙" },
      {
        id: "3",
        title: "Stack Overflow",
        url: "https://stackoverflow.com",
        favicon: "📚",
      },
      {
        id: "4",
        title: "MDN Web Docs",
        url: "https://developer.mozilla.org",
        favicon: "📖",
      },
    ]
  );

  const [history] = useState<HistoryItem[]>(
    customHistory || [
      {
        id: "1",
        title: "Google",
        url: "https://www.google.com",
        timestamp: new Date(Date.now() - 3_600_000),
        favicon: "🔍",
      },
      {
        id: "2",
        title: "GitHub",
        url: "https://github.com",
        timestamp: new Date(Date.now() - 7_200_000),
        favicon: "🐙",
      },
      {
        id: "3",
        title: "Stack Overflow",
        url: "https://stackoverflow.com",
        timestamp: new Date(Date.now() - 10_800_000),
        favicon: "📚",
      },
    ]
  );

  const activeTab = tabs.find((tab) => tab.isActive);

  useEffect(() => {
    if (autoFocusAddressBar) {
      const addressBar = document.querySelector(
        'input[placeholder*="Search or enter address"]'
      ) as HTMLInputElement;
      if (addressBar) {
        addressBar.focus();
      }
    }
  }, [autoFocusAddressBar]);

  const createNewTab = () => {
    if (tabs.length >= maxTabs) {
      return;
    }

    const newTab: Tab = {
      id: Date.now().toString(),
      title: "New Tab",
      url: "about:blank",
      isActive: true,
      isLoading: false,
    };

    setTabs((prev) =>
      prev.map((tab) => ({ ...tab, isActive: false })).concat(newTab)
    );
    setCurrentUrl("about:blank");
    setInputUrl("");

    onTabCreate?.(newTab);
  };

  const closeTab = (tabId: string) => {
    if (tabs.length === 1) {
      return;
    }

    const tabIndex = tabs.findIndex((tab) => tab.id === tabId);
    const wasActive = tabs[tabIndex].isActive;

    const newTabs = tabs.filter((tab) => tab.id !== tabId);

    if (wasActive && newTabs.length > 0) {
      const nextActiveIndex = Math.min(tabIndex, newTabs.length - 1);
      newTabs[nextActiveIndex].isActive = true;
      setCurrentUrl(newTabs[nextActiveIndex].url);
      setInputUrl(newTabs[nextActiveIndex].url);
    }

    setTabs(newTabs);

    onTabClose?.(tabId);
  };

  const switchTab = (tabId: string) => {
    const newTabs = tabs.map((tab) => ({
      ...tab,
      isActive: tab.id === tabId,
    }));

    const switchedTab = newTabs.find((tab) => tab.isActive);
    if (switchedTab) {
      setCurrentUrl(switchedTab.url);
      setInputUrl(switchedTab.url);
    }

    setTabs(newTabs);

    onTabSwitch?.(tabId);
  };

  const navigateToUrl = (urlParam: string) => {
    let finalUrl = urlParam;
    if (
      !(
        finalUrl.startsWith("http://") ||
        finalUrl.startsWith("https://") ||
        finalUrl.startsWith("about:")
      )
    ) {
      finalUrl = `https://www.google.com/search?q=${encodeURIComponent(finalUrl)}`;
    }

    setCurrentUrl(finalUrl);
    setInputUrl(finalUrl);
    setIsSecure(finalUrl.startsWith("https://"));

    setTabs((prev) =>
      prev.map((tab) =>
        tab.isActive
          ? {
              ...tab,
              url: finalUrl,
              title: new URL(finalUrl).hostname || "New Tab",
              isLoading: simulateLoading,
            }
          : tab
      )
    );

    const activeTabId = tabs.find((tab) => tab.isActive)?.id || "";
    onNavigate?.(finalUrl, activeTabId);

    if (simulateLoading) {
      setTimeout(() => {
        setTabs((prev) =>
          prev.map((tab) => (tab.isActive ? { ...tab, isLoading: false } : tab))
        );
      }, loadingDuration);
    }
  };

  const handleUrlSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigateToUrl(inputUrl);
  };

  const goBack = () => {
    setCanGoForward(true);
  };

  const goForward = () => {
    setCanGoBack(true);
  };

  const refresh = () => {
    setTabs((prev) =>
      prev.map((tab) => (tab.isActive ? { ...tab, isLoading: true } : tab))
    );

    setTimeout(() => {
      setTabs((prev) =>
        prev.map((tab) => (tab.isActive ? { ...tab, isLoading: false } : tab))
      );
    }, 1000);
  };

  const toggleBookmark = () => {
    const newBookmarkedState = !isBookmarked;
    setIsBookmarked(newBookmarkedState);

    onBookmarkToggle?.(currentUrl, newBookmarkedState);
  };

  const simulateDownload = () => {
    onDownload?.(currentUrl);

    if (!enableDownloads) {
      return;
    }

    setIsDownloading(true);
    setDownloadProgress(0);

    const interval = setInterval(() => {
      setDownloadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsDownloading(false);
          return 0;
        }
        return prev + 10;
      });
    }, 200);
  };

  return (
    <div
      className={cn(
        "flex h-full flex-col overflow-hidden rounded-lg border border-border bg-background",
        isFullscreen ? "fixed inset-0 z-50 rounded-none border-0" : "",
        className
      )}
    >
      {!!showWindowControls && (
        <div className="flex items-center justify-between border-border border-b bg-muted/50 px-4 py-2">
          <div className="flex items-center gap-2">
            <div className="flex gap-2">
              <div className="h-3 w-3 rounded-full bg-red-500" />
              <div className="h-3 w-3 rounded-full bg-yellow-500" />
              <div className="h-3 w-3 rounded-full bg-green-500" />
            </div>
          </div>

          <div className="flex items-center gap-2 text-muted-foreground text-sm">
            <Wifi className="h-4 w-4" />
            <Volume2 className="h-4 w-4" />
            <Battery className="h-4 w-4" />
            <span>
              {new Date().toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </span>
          </div>

          <div className="flex items-center gap-1">
            <Button
              onClick={() => setIsFullscreen(!isFullscreen)}
              size="sm"
              variant="ghost"
            >
              {isFullscreen ? (
                <Minimize2 className="h-4 w-4" />
              ) : (
                <Maximize2 className="h-4 w-4" />
              )}
            </Button>
            <Button size="sm" variant="ghost">
              <Square className="h-4 w-4" />
            </Button>
            <Button size="sm" variant="ghost">
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}

      {!!enableTabManagement && (
        <div className="flex items-center border-border border-b bg-muted/30">
          <div className="flex flex-1 items-center overflow-x-auto">
            {tabs.map((tab) => (
              <button
                className={cn(
                  "flex min-w-0 max-w-64 cursor-pointer items-center gap-2 border-border border-r px-4 py-2",
                  tab.isActive ? "bg-background" : "hover:bg-muted/50"
                )}
                key={tab.id}
                onClick={() => switchTab(tab.id)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    switchTab(tab.id);
                  }
                }}
                type="button"
              >
                <div className="flex min-w-0 flex-1 items-center gap-2">
                  {tab.isLoading ? (
                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-primary border-t-transparent" />
                  ) : (
                    <Globe className="h-4 w-4 shrink-0 text-muted-foreground" />
                  )}
                  <span className="truncate text-sm">{tab.title}</span>
                </div>
                {tabs.length > 1 && (
                  <Button
                    className="h-4 w-4 p-0 hover:bg-muted"
                    onClick={(e) => {
                      e.stopPropagation();
                      closeTab(tab.id);
                    }}
                    size="sm"
                    variant="ghost"
                  >
                    <X className="h-3 w-3" />
                  </Button>
                )}
              </button>
            ))}
          </div>

          <Button
            className="border-border border-l px-3 py-2"
            onClick={createNewTab}
            size="sm"
            variant="ghost"
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>
      )}

      <div className="flex items-center gap-2 border-border border-b bg-background p-2">
        <div className="flex items-center gap-1">
          <Button
            disabled={!canGoBack}
            onClick={goBack}
            size="sm"
            variant="ghost"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            disabled={!canGoForward}
            onClick={goForward}
            size="sm"
            variant="ghost"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
          <Button onClick={refresh} size="sm" variant="ghost">
            <RotateCcw className="h-4 w-4" />
          </Button>
          <Button
            onClick={() => navigateToUrl("about:home")}
            size="sm"
            variant="ghost"
          >
            <Home className="h-4 w-4" />
          </Button>
        </div>

        <form className="flex flex-1 items-center" onSubmit={handleUrlSubmit}>
          <div className="relative flex flex-1 items-center">
            <div className="absolute left-3 flex items-center gap-2">
              {isSecure ? (
                <Lock className="h-4 w-4 text-green-600" />
              ) : (
                <Shield className="h-4 w-4 text-muted-foreground" />
              )}
            </div>
            <Input
              className="pr-4 pl-10"
              onChange={(e) => setInputUrl(e.target.value)}
              placeholder="Search or enter address"
              value={inputUrl}
            />
          </div>
        </form>

        <div className="flex items-center gap-1">
          {!!enableBookmarks && (
            <Button onClick={toggleBookmark} size="sm" variant="ghost">
              {isBookmarked ? (
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              ) : (
                <StarOff className="h-4 w-4" />
              )}
            </Button>
          )}
          {!!enableDownloads && (
            <Button onClick={simulateDownload} size="sm" variant="ghost">
              <Download className="h-4 w-4" />
            </Button>
          )}
          {!!enableSettings && (
            <Button
              onClick={() => setShowSettings(!showSettings)}
              size="sm"
              variant="ghost"
            >
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          )}
        </div>
      </div>

      {!!showBookmarksBar && !!enableBookmarks && (
        <div className="flex items-center gap-2 border-border border-b bg-muted/20 px-4 py-1 text-sm">
          <Button
            className="text-xs"
            onClick={() => setShowBookmarks(!showBookmarks)}
            size="sm"
            variant="ghost"
          >
            <BookmarkIcon className="mr-1 h-3 w-3" />
            Bookmarks
          </Button>
          {!!enableHistory && (
            <Button
              className="text-xs"
              onClick={() => setShowHistory(!showHistory)}
              size="sm"
              variant="ghost"
            >
              <History className="mr-1 h-3 w-3" />
              History
            </Button>
          )}
          <Separator className="h-4" orientation="vertical" />
          {bookmarks.slice(0, 4).map((bookmark) => (
            <Button
              className="text-xs"
              key={bookmark.id}
              onClick={() => navigateToUrl(bookmark.url)}
              size="sm"
              variant="ghost"
            >
              <span className="mr-1">{bookmark.favicon}</span>
              {bookmark.title}
            </Button>
          ))}
        </div>
      )}

      {!!isDownloading && !!enableDownloads && (
        <div className="border-border border-b bg-blue-50 px-4 py-2 dark:bg-blue-950">
          <div className="flex items-center gap-2 text-sm">
            <Download className="h-4 w-4" />
            <span>Downloading file...</span>
            <div className="h-2 flex-1 rounded-full bg-muted">
              <div
                className="h-2 rounded-full bg-blue-600 transition-all duration-200"
                style={{ width: `${downloadProgress}%` }}
              />
            </div>
            <span>{downloadProgress}%</span>
          </div>
        </div>
      )}

      <div className="flex h-full flex-1 overflow-hidden">
        {!!showBookmarks && !!enableBookmarks && (
          <Card className="m-2 mr-0 w-80 overflow-y-auto p-4">
            <h3 className="mb-4 flex items-center gap-2 font-semibold">
              <BookmarkIcon className="h-4 w-4" />
              Bookmarks
            </h3>
            <div className="space-y-2">
              {bookmarks.map((bookmark) => (
                <button
                  className="flex w-full cursor-pointer items-center gap-2 rounded p-2 hover:bg-muted"
                  key={bookmark.id}
                  onClick={() => navigateToUrl(bookmark.url)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      navigateToUrl(bookmark.url);
                    }
                  }}
                  type="button"
                >
                  <span>{bookmark.favicon}</span>
                  <div className="min-w-0 flex-1">
                    <div className="truncate font-medium text-sm">
                      {bookmark.title}
                    </div>
                    <div className="truncate text-muted-foreground text-xs">
                      {bookmark.url}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </Card>
        )}

        {!!showHistory && !!enableHistory && (
          <Card className="m-2 mr-0 w-80 overflow-y-auto p-4">
            <h3 className="mb-4 flex items-center gap-2 font-semibold">
              <History className="h-4 w-4" />
              History
            </h3>
            <div className="space-y-2">
              {history.map((item) => (
                <button
                  className="flex w-full cursor-pointer items-center gap-2 rounded p-2 hover:bg-muted"
                  key={item.id}
                  onClick={() => navigateToUrl(item.url)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      navigateToUrl(item.url);
                    }
                  }}
                  type="button"
                >
                  <span>{item.favicon}</span>
                  <div className="min-w-0 flex-1">
                    <div className="truncate font-medium text-sm">
                      {item.title}
                    </div>
                    <div className="truncate text-muted-foreground text-xs">
                      {item.url}
                    </div>
                    <div className="text-muted-foreground text-xs">
                      {item.timestamp.toLocaleTimeString()}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </Card>
        )}

        {!!showSettings && !!enableSettings && (
          <Card className="m-2 mr-0 w-80 overflow-y-auto p-4">
            <h3 className="mb-4 flex items-center gap-2 font-semibold">
              <Settings className="h-4 w-4" />
              Settings
            </h3>
            <div className="space-y-4">
              <div>
                <h4 className="mb-2 font-medium">Privacy & Security</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center justify-between">
                    <span>Block pop-ups</span>
                    <Badge variant="secondary">On</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Safe browsing</span>
                    <Badge variant="secondary">Enhanced</Badge>
                  </div>
                </div>
              </div>
              <Separator />
              <div>
                <h4 className="mb-2 font-medium">Appearance</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center justify-between">
                    <span>Theme</span>
                    <Badge variant="outline">System</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Zoom</span>
                    <Badge variant="outline">100%</Badge>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        )}

        <div className="m-2 flex flex-1 flex-col overflow-hidden rounded-lg border border-border bg-white shadow-xl dark:bg-muted/20">
          {(() => {
            if (renderContent) {
              return renderContent(currentUrl, activeTab?.isLoading ?? false);
            }
            if (currentUrl === "about:blank" || currentUrl === "") {
              return (
                <div className="flex flex-1 items-center justify-center">
                  <div className="space-y-4 text-center">
                    <Search className="mx-auto h-16 w-16 text-muted-foreground" />
                    <h2 className="font-semibold text-2xl">New Tab</h2>
                    <p className="text-muted-foreground">
                      Start by searching or entering a web address
                    </p>
                    <div className="mt-8 grid grid-cols-2 gap-4">
                      {bookmarks.slice(0, 4).map((bookmark) => (
                        <Card
                          className="cursor-pointer p-4 transition-colors hover:bg-muted/50"
                          key={bookmark.id}
                          onClick={() => navigateToUrl(bookmark.url)}
                        >
                          <div className="space-y-2 text-center">
                            <div className="text-2xl">{bookmark.favicon}</div>
                            <div className="font-medium text-sm">
                              {bookmark.title}
                            </div>
                          </div>
                        </Card>
                      ))}
                    </div>
                  </div>
                </div>
              );
            }
            return (
              <div className="flex h-full max-h-[500px] min-h-[250px] w-full flex-1 items-center justify-center px-4 py-1">
                <Image
                  alt="Browser preview"
                  className="h-auto max-h-full w-auto max-w-full rounded-lg object-contain shadow-2xl"
                  height={900}
                  priority
                  quality={100}
                  src={displayImage}
                  width={1400}
                />
              </div>
            );
          })()}
        </div>
      </div>

      {!!showStatusBar && (
        <div className="flex items-center justify-between border-border border-t bg-muted/30 px-4 py-1 text-muted-foreground text-xs">
          <div className="flex items-center gap-4">
            <span>Ready</span>
            {!!isSecure && (
              <span className="flex items-center gap-1">
                <Lock className="h-3 w-3" /> Secure
              </span>
            )}
          </div>
          <div className="flex items-center gap-4">
            <span>Zoom: 100%</span>
            <span>
              {tabs.length} tab{tabs.length !== 1 ? "s" : ""}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
