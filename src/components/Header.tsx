import React from 'react';
import { ExternalLink } from 'lucide-react';
import { cn } from '../utils';

interface HeaderProps {
  externalLink: string;
  externalLinkText?: string;
  isSidebarCollapsed: boolean;
  onToggleSidebar: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  externalLink,
  externalLinkText = "Link Externo",
  isSidebarCollapsed,
  onToggleSidebar
}) => {
  return (
    <header className="h-[60px] flex items-center justify-end px-4 bg-white text-gray-800">

      <a
        href={externalLink}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2 px-3 py-2 text-gray-600 hover:bg-gray-100 rounded-md transition-colors text-sm font-medium"
        title={externalLinkText}
      >
        <span>{externalLinkText}</span>
        <ExternalLink size={16} />
      </a>
    </header>
  );
};
