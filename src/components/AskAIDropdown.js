// Overriding https://github.com/FlyNumber/markdown_docusaurus_plugin/blob/main/components/MarkdownActionsDropdown/index.js
import React, { useState, useRef, useEffect } from 'react';

export default function AskAIDropdown() {
  const [copied, setCopied] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const currentUrl = window.location.href;

  // Get pathname from window.location for URL construction
  const currentPath = typeof window !== 'undefined' ? window.location.pathname : '';

  // Handle click outside to close dropdown
  useEffect(() => {
    // Only add listener if dropdown is open
    if (!isOpen) return;

    const handleClickOutside = (event) => {
      // If the click is outside the dropdown, close it
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    // Add event listener to document
    // Use mousedown instead of click for better UX (fires before click)
    document.addEventListener('mousedown', handleClickOutside);

    // Cleanup function to remove event listener
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  // Construct the .md URL (handles directory indexes like /docs/ -> /docs/intro.md)
  const markdownUrl = currentPath.endsWith('/')
    ? `${currentPath}intro.md`
    : `${currentPath}.md`;

  // Handle opening markdown in new tab
  const handleOpenMarkdown = () => {
    window.open(markdownUrl, '_blank');
    setIsOpen(false);
  };

  // Handle copying markdown to clipboard
  const handleCopyMarkdown = async () => {
    try {
      const response = await fetch(markdownUrl);
      if (!response.ok) {
        throw new Error('Failed to fetch markdown');
      }
      const markdown = await response.text();
      await navigator.clipboard.writeText(markdown);

      setCopied(true);
      setTimeout(() => {
        setCopied(false);
        setIsOpen(false);
      }, 2000);
    } catch (error) {
      console.error('Failed to copy markdown:', error);
      alert('Failed to copy markdown. Please try again.');
    }
  };

  return (
    <div
      ref={dropdownRef}
      className={`dropdown ${isOpen ? 'dropdown--show' : ''}`}
    >
      <button
        className="button button--outline button--secondary button--sm"
        onClick={() => setIsOpen(!isOpen)}
        aria-haspopup="true"
        aria-expanded={isOpen}
        style={{display: 'inline-flex', alignItems: 'center'}}
      >
        Ask AI
        <svg width="14" height="14" viewBox="0 0 16 16" style={{marginLeft: '6px'}}>
          <path fill="currentColor" d="M4.427 6.427l3.396 3.396a.25.25 0 00.354 0l3.396-3.396a.25.25 0 00-.177-.427H4.604a.25.25 0 00-.177.427z"/>
        </svg>
      </button>

      <ul className="dropdown__menu">
        <li>
          <a
            className="dropdown__link"
            onClick={handleOpenMarkdown}
          >
            <div className='grid'>
              <svg viewBox="0 0 208 128" width="16" height="16">
                <path fill="currentColor" d="M193 128H15a15 15 0 0 1-15-15V15A15 15 0 0 1 15 0h178a15 15 0 0 1 15 15v98a15 15 0 0 1-15 15zM50 98V59l20 25 20-25v39h20V30H90L70 55 50 30H30v68zm134-34h-20V30h-20v34h-20l30 35z"/>
              </svg>
              <span>View as Markdown</span>
            </div>
            <span className='description'>View this page as Markdown</span>
          </a>
        </li>
        <li>
          <a
            className="dropdown__link"
            onClick={handleCopyMarkdown}
            disabled={copied}
          >
            {copied ? (
              <>
                <div className='grid'>
                  <svg width="16" height="16" viewBox="0 0 16 16">
                    <path fill="currentColor" d="M13.78 4.22a.75.75 0 010 1.06l-7.25 7.25a.75.75 0 01-1.06 0L2.22 9.28a.75.75 0 011.06-1.06L6 10.94l6.72-6.72a.75.75 0 011.06 0z"/>
                  </svg>
                  <span>Copied!</span>
                </div>
                <span className='description'>Page copied to clipboard</span>
              </>
            ) : (
              <>
                <div className='grid'>
                  <svg width="16" height="16" viewBox="0 0 16 16">
                    <path fill="currentColor" d="M0 6.75C0 5.784.784 5 1.75 5h1.5a.75.75 0 010 1.5h-1.5a.25.25 0 00-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 00.25-.25v-1.5a.75.75 0 011.5 0v1.5A1.75 1.75 0 019.25 16h-7.5A1.75 1.75 0 010 14.25v-7.5z"/>
                    <path fill="currentColor" d="M5 1.75C5 .784 5.784 0 6.75 0h7.5C15.216 0 16 .784 16 1.75v7.5A1.75 1.75 0 0114.25 11h-7.5A1.75 1.75 0 015 9.25v-7.5zm1.75-.25a.25.25 0 00-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 00.25-.25v-7.5a.25.25 0 00-.25-.25h-7.5z"/>
                  </svg>
                  <span>Copy Page as Markdown</span>
                </div>
                <span className='description'>Copy page as Markdown for LLMs</span>
              </>
            )}
          </a>
        </li>
        <li>
          <hr style={{margin:0, border:'1px'}} />
        </li>
        <li>
          <a
            className="dropdown__link"
            href={`https://chatgpt.com/?q=Read%20${encodeURIComponent(currentUrl)}%20and%20answer%20questions%20about%20the%20content.`}
            target='_blank'
          >
            <div className='grid'>
              <svg viewBox="0 0 505 505" width="16" height="16">
                <path fill="currentColor" d="M207 45c-35.4 7.5-64.4 33.4-76.5 68.4-2.4 6.9-3.6 9.2-5.1 9.4-37.7 5.3-67.7 33.7-77.7 73.2-3.2 12.6-3.1 36 .2 48.4 4.5 17.3 12.4 32.3 23 43.8l6.4 6.9-2.7 8.7c-8.6 28.4-4.3 56.6 12.3 81.1 23.2 34.1 66.9 51.4 107.2 42.5l7.6-1.6 9.4 9.3c13.6 13.6 28.5 21.7 46.1 25.3 9.6 2 28.2 2.1 38 .2 37-7.1 66.8-33 79.2-68.9l3.2-9.1 8.3-1.7c16.1-3.5 30.8-11.2 43.2-22.7 13.3-12.4 23.3-29.7 28.2-49.2 3-12.1 3-36.9-.1-48.2-4.9-17.9-12.7-32.7-23.1-44l-6.4-6.9 2.7-8.7c8.6-28.4 4.3-56.6-12.3-81.1-23.2-34.1-66.4-51.3-107.3-42.6l-7.6 1.6-9.4-9.3c-13.5-13.5-28.4-21.6-46-25.2-10.5-2.2-29.8-2-40.8.4m38.7 19.5c8.4 2 18.1 6.5 25.6 11.9 6.3 4.5 12.4 10.3 11.6 11-.2.2-21.5 12.6-47.4 27.5-25.8 14.9-48.1 28.3-49.4 29.8l-2.4 2.8.7 60.2c.5 44.1.4 60.3-.5 60.3-.6 0-9.6-4.8-20-10.6L145 246.8v-54.4c0-45.8.3-55.7 1.6-62.2 6.5-31.9 30.9-57.5 62.2-65.2 9.7-2.3 28-2.6 36.9-.5m109.6 33.9c11.2 3.3 19.4 7.4 28.5 14.3 19.3 14.7 31.3 38.1 31.2 60.8-.1 6.2-2.6 20.5-3.8 21.7-.6.6-18.9-9.4-48.8-26.6-38.8-22.4-48.4-27.6-51.3-27.5-2.9 0-13.9 6.2-54.6 30.3-28 16.7-51.3 30.2-51.7 29.9-.5-.2-.8-10.5-.8-22.8v-22.3l43.3-25c46.5-26.8 50.6-29.1 58.2-31.7 15-5.2 34.3-5.6 49.8-1.1M125 199.9c0 53.3.1 55.9 1.9 58.2 1 1.4 25.1 15.5 53.5 31.4 28.3 16 51.4 29.4 51.2 30-.1.5-8.8 6-19.2 12.2l-18.9 11.1-3-1.8c-1.6-1-21.9-12.7-45-26s-44.1-25.8-46.7-27.7c-6.4-4.7-17.6-16.9-21.7-23.6-8.4-14.1-11.6-26.1-11.6-43.7 0-14.3 1.2-20.4 5.9-32.2 5.8-14.2 17.1-27.7 29.5-35.3 6.6-3.9 21.8-9.8 23.3-8.9.4.3.8 25.6.8 56.3m234.5-9.9c23.1 13.3 44.1 25.8 46.7 27.7 6.4 4.7 17.6 16.9 21.7 23.6 8.4 14.1 11.6 26.1 11.6 43.7 0 14.3-1.2 20.4-5.9 32.2-5.8 14.2-17.1 27.7-29.5 35.3-6.6 3.9-21.8 9.8-23.3 8.9-.4-.3-.8-25.6-.8-56.3 0-53.6-.1-55.9-1.9-58.3-1.1-1.3-25.1-15.4-53.5-31.4-28.4-15.9-51.4-29.3-51.3-29.8.2-.6 8.9-6.1 19.3-12.2l18.9-11.3 3 1.9c1.6.9 21.9 12.7 45 26m-86.8 19.1c10.9 6.1 21.5 12.2 23.6 13.5l3.7 2.4v54.8l-23 13.6c-12.6 7.5-23.3 13.6-23.8 13.6-1.1 0-44.8-24.5-46.9-26.2-1-.8-1.3-7.5-1.3-28.3v-27.3l22.8-13.5c12.5-7.5 23.3-13.6 23.9-13.6.7-.1 10.2 4.9 21 11m68.4 38.5 19 10.7-.3 57.6c-.4 56.6-.4 57.7-2.6 65.1-5.3 17.1-16.7 33.9-29.9 43.9-15.2 11.5-31.8 17.1-50.8 17.1-13.3 0-21.3-1.8-32-7-7.2-3.5-21.4-14-22.2-16.5-.2-.6 21.1-13.4 47.3-28.4 26.1-15.1 48.5-28.6 49.6-30 2.1-2.6 2.1-3 1.4-62.9-.5-43.8-.3-60.2.5-60.2.6 0 9.6 4.8 20 10.6M301 326.5v22.3l-43.7 25.3c-24.1 13.9-46.9 26.7-50.8 28.5-11.8 5.4-19.3 6.8-34.5 6.8-11.7-.1-14.7-.4-22.5-2.8-37-11.2-61.6-44-59.2-79.1.7-8.9 2.1-16.2 3.7-17.8.4-.5 22.3 11.5 48.6 26.7 38.8 22.4 48.4 27.6 51.3 27.5 2.9 0 14-6.2 54.6-30.3 28.1-16.7 51.3-30.1 51.8-29.9.4.2.7 10.5.7 22.8"/>
              </svg>
              <span>Open in ChatGPT</span>
            </div>
            <span className='description'>Ask ChatGPT about this page</span>
          </a>
        </li>
        <li>
          <a
            className="dropdown__link"
            href={`https://claude.ai/new?q=Read%20${encodeURIComponent(currentUrl)}%20and%20answer%20questions%20about%20the%20content.`}
            target='_blank'
          >
            <div className='grid'>
              <svg viewBox="0 0 259 259" width="16" height="16">
                <path fill="currentColor" d="M68.8 3.2c-.9.7-3 3.3-4.7 5.7-5.2 7.4-3.9 13.6 6.6 31.1 6.4 10.7 13.6 23.2 26.1 45.5 2.8 4.9 4.7 9.4 4.3 9.8-.9.9-21.3-13.7-44.6-31.8C39.7 50.4 39.3 50.2 34 50c-6.7-.3-6.6-.3-9.8 3.8-2.8 3.5-2.9 4-2.1 9.1.5 3.3 1.7 6.3 3.1 7.8 3.3 3.5 22.4 17 49.8 35.2 25.3 16.8 28.9 19.5 27.7 20.8-.4.4-9.4-.1-20-1.1-10.5-.9-31.8-2.6-47.1-3.6-26.2-1.8-28.1-1.8-30.8-.2-1.6.9-2.8 2.5-2.8 3.6 0 3.3 4.8 9.3 7.9 9.9 3.6.7 38 2.5 68.4 3.6 13.1.5 24 1 24.3 1.3 1.5 1.6-2.9 4.6-23.9 16.3-21.7 12.1-42.4 25.1-47.4 29.7-1.3 1.2-2.3 3.5-2.5 5.9-.3 3.2.1 4.4 2.3 6.5 2.3 2.2 3.1 2.4 8.4 1.8 5.3-.7 7.8-2 31.9-17.7 40-25.9 41.6-27 42.3-26.4.3.3-2.4 4.1-6 8.4C99.9 174 63 221.4 60.8 225c-.9 1.4-1.8 4-2.2 5.8-.5 2.9-.2 3.5 2.7 5.2 1.7 1.1 4.2 2 5.3 2 3.5 0 20.6-18.8 35.5-39 7.5-10.2 16.2-22 19.3-26.3 3.1-4.2 6.1-7.7 6.7-7.7s.8.4.5.9c-.3.4-1.9 8.6-3.5 18.2s-5 27.2-7.6 39.1L113 245l1.9 3.7c1 2.1 3.3 5 5 6.5l3.1 2.8 4.3-2.1c2.4-1.2 4.9-3 5.6-4.1s2.7-18.2 4.7-40.1c2-21 3.7-38.4 3.9-38.6.9-.8 2.7 1.6 8.5 11.6 6.9 11.8 21.3 33.7 29.6 44.9 5.8 7.9 9.1 9.5 15.2 7.3 4.4-1.5 5.5-3.9 4.6-10.7-.6-5.2-2-7.7-15.5-27.9-13.9-20.8-16.3-25-14-24.1.5.2 7.8 6.1 16.2 13.3 22.6 19.2 36.8 29.7 39.9 29.3 2.9-.3 4.6-4.2 3.7-8-.4-1.5-9.1-10.2-22.4-22.4-28.5-26.1-37.9-35.1-37.1-35.9.3-.4 17 3.2 36.9 8l36.3 8.7 6.3-3.1c8.6-4.2 9.6-6.6 5.3-12-7.5-9.3-8.9-9.6-49-11.2-26.3-1.1-36.6-2.1-34-3.2 2.2-1 34.4-8.4 50.9-11.8 7.8-1.6 15.9-3.3 18-3.8 12.6-3.3 12-3 13.6-6.9 2.4-5.7 1.7-8.3-3.2-11l-4.2-2.3-17.4 3c-9.5 1.7-24.7 4.7-33.8 6.6-9 1.9-16.7 3.5-17.1 3.5-3.9 0 9.9-20.7 34.6-51.9 6.1-7.8 9.6-15.1 9.6-20 0-.8-1.7-4.1-3.8-7.3l-3.7-5.8h-11.7l-8.2 8.3c-8.5 8.7-21.7 24.3-34.1 40.7-7.9 10.3-11 13.6-11.8 12.3-.3-.5 1.2-10.1 3.4-21.3 4.8-25.1 8.9-49.5 8.9-53.2 0-3.6-6.7-10.8-10.2-10.8-3.4 0-9.2 5.6-11.1 10.6-.9 2.3-2.3 12.2-3.1 22-.9 9.9-2.3 23.7-3.1 30.9-.8 7.1-1.7 16.7-2.1 21.2-.3 4.6-1 8.3-1.4 8.3-.5 0-1.6-2.6-2.5-5.8-.9-3.1-6.2-14.5-11.8-25.2-5.5-10.7-14.4-29.1-19.7-40.9C88.4 7.8 87.1 5.5 84 3.9c-4-2.2-12.8-2.5-15.2-.7"/>
              </svg>
              <span>Open in Claude</span>
            </div>
            <span className='description'>Ask Claude about this page</span>
          </a>
        </li>
      </ul>
    </div>
  );
}