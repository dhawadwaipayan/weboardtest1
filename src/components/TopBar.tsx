import React, { useState, useRef } from 'react';

interface ButtonProps {
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
}

const TopBarButton: React.FC<ButtonProps> = ({ 
  icon, 
  label, 
  onClick 
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);

  const handleClick = () => {
    setIsClicked(true);
    onClick();
    setTimeout(() => setIsClicked(false), 150);
  };

  const getTextColor = () => {
    if (isClicked) return 'text-[#E1FF00]';
    if (isHovered) return 'text-white';
    return 'text-neutral-400';
  };

  return (
    <button
      onClick={handleClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`flex items-center gap-2.5 justify-center px-2.5 py-2 text-sm whitespace-nowrap min-h-[30px] cursor-pointer transition-colors ${getTextColor()}`}
      aria-label={label}
    >
      <div className="w-[12px] h-[12px] flex items-center justify-center">
        {icon}
      </div>
      <span className="self-stretch my-auto">{label}</span>
    </button>
  );
};

export const TopBar: React.FC = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const handleImport = () => {
    console.log('TopBar: Import button clicked');
    fileInputRef.current?.click();
  };
  
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    console.log('TopBar: File selected:', file?.name, file?.type);
    if (file && file.type.startsWith('image/')) {
      console.log('TopBar: Valid image file, calling canvas import handler');
      if ((window as any).handleCanvasImageImport) {
        (window as any).handleCanvasImageImport(file);
        console.log('TopBar: Canvas import handler called successfully');
      } else {
        console.error('TopBar: Canvas import handler not found on window object');
      }
    } else {
      console.log('TopBar: Invalid file type or no file selected');
    }
    event.target.value = '';
  };
  
  const handleExport = () => {
    console.log('Export clicked');
  };
  
  const handleUndo = () => {
    console.log('Undo clicked');
  };
  
  const handleRedo = () => {
    console.log('Redo clicked');
  };

  return (
    <div className="flex items-center gap-4 bg-[#1a1a1a] border border-[#373737] rounded-xl px-4 py-2 h-[45px] pointer-events-auto">
      {/* Hidden file input */}
      <input 
        ref={fileInputRef} 
        type="file" 
        accept="image/*" 
        onChange={handleFileChange} 
        className="hidden" 
      />
      
      {/* Logo */}
      <div className="flex items-center">
        <img 
          src="/cotonlogo_main.svg" 
          alt="weweaveboard Logo" 
          className="h-[15px] w-auto object-contain" 
        />
      </div>
      
      {/* Divider */}
      <div className="bg-[#373737] w-px h-[21px]" />
      
      {/* Board Name */}
      <span className="text-white text-sm font-normal">Board 1</span>
      
      {/* Divider */}
      <div className="bg-[#373737] w-px h-[21px]" />
      
      {/* Action Buttons */}
      <div className="flex items-center gap-2">
        <TopBarButton
          icon={
            <svg viewBox="0 0 20 20" fill="currentColor" className="w-3 h-3">
              <path d="M9.25 13.25a.75.75 0 001.5 0V4.636l2.955 3.129a.75.75 0 001.09-1.03l-4.25-4.5a.75.75 0 00-1.09 0l-4.25 4.5a.75.75 0 101.09 1.03L9.25 4.636v8.614z" />
              <path d="M3.5 12.75a.75.75 0 00-1.5 0v2.5A2.75 2.75 0 004.75 18h10.5A2.75 2.75 0 0018 15.25v-2.5a.75.75 0 00-1.5 0v2.5c0 .69-.56 1.25-1.25 1.25H4.75c-.69 0-1.25-.56-1.25-1.25v-2.5z" />
            </svg>
          }
          label="Import"
          onClick={handleImport}
        />
        
        <TopBarButton
          icon={
            <svg viewBox="0 0 20 20" fill="currentColor" className="w-3 h-3">
              <path d="M10.75 2.75a.75.75 0 00-1.5 0v8.614L6.295 8.235a.75.75 0 10-1.09 1.03l4.25 4.5a.75.75 0 001.09 0l4.25-4.5a.75.75 0 00-1.09-1.03L10.75 11.364V2.75z" />
              <path d="M3.5 12.75a.75.75 0 00-1.5 0v2.5A2.75 2.75 0 004.75 18h10.5A2.75 2.75 0 0018 15.25v-2.5a.75.75 0 00-1.5 0v2.5c0 .69-.56 1.25-1.25 1.25H4.75c-.69 0-1.25-.56-1.25-1.25v-2.5z" />
            </svg>
          }
          label="Export"
          onClick={handleExport}
        />
        
        <TopBarButton
          icon={
            <svg viewBox="0 0 20 20" fill="currentColor" className="w-3 h-3">
              <path fillRule="evenodd" d="M7.793 2.232a.75.75 0 01-.025 1.06L3.622 7.25h10.003a5.375 5.375 0 010 10.75H10.75a.75.75 0 010-1.5h2.875a3.875 3.875 0 000-7.75H3.622l4.146 3.957a.75.75 0 01-1.036 1.085l-5.5-5.25a.75.75 0 010-1.085l5.5-5.25a.75.75 0 011.06.025z" clipRule="evenodd" />
            </svg>
          }
          label="Undo"
          onClick={handleUndo}
        />
        
        <TopBarButton
          icon={
            <svg viewBox="0 0 20 20" fill="currentColor" className="w-3 h-3">
              <path fillRule="evenodd" d="M12.207 2.232a.75.75 0 00.025 1.06l4.146 3.958H6.375a5.375 5.375 0 000 10.75H9.25a.75.75 0 000-1.5H6.375a3.875 3.875 0 010-7.75h10.003l-4.146 3.957a.75.75 0 001.036 1.085l5.5-5.25a.75.75 0 000-1.085l-5.5-5.25a.75.75 0 00-1.06.025z" clipRule="evenodd" />
            </svg>
          }
          label="Redo"
          onClick={handleRedo}
        />
      </div>
    </div>
  );
};