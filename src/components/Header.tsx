import React, { useRef, useState } from 'react';

interface HeaderButtonProps {
  defaultIcon: string;
  hoverIcon: string;
  clickedIcon: string;
  label: string;
  onClick: () => void;
}

const HeaderButton: React.FC<HeaderButtonProps> = ({ 
  defaultIcon, 
  hoverIcon, 
  clickedIcon, 
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

  const getCurrentIcon = () => {
    if (isClicked) return clickedIcon;
    if (isHovered) return hoverIcon;
    return defaultIcon;
  };

  return (
    <button
      onClick={handleClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="flex items-center justify-center w-[30px] h-[30px] transition-all duration-150"
      aria-label={label}
    >
      <img 
        src={getCurrentIcon()} 
        alt={label}
        className="w-full h-full object-contain"
      />
    </button>
  );
};

export const Header: React.FC = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const handleImport = () => {
    console.log('Header: Import button clicked');
    fileInputRef.current?.click();
  };
  
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    console.log('Header: File selected:', file?.name, file?.type);
    if (file && file.type.startsWith('image/')) {
      console.log('Header: Valid image file, calling canvas import handler');
      if ((window as any).handleCanvasImageImport) {
        (window as any).handleCanvasImageImport(file);
        console.log('Header: Canvas import handler called successfully');
      } else {
        console.error('Header: Canvas import handler not found on window object');
      }
    } else {
      console.log('Header: Invalid file type or no file selected');
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
    <header className="bg-[rgba(26,26,26,1)] shadow-[5px_4px_30px_rgba(0,0,0,0.25)] border flex min-h-[45px] items-center gap-[15px] flex-wrap rounded-xl border-[rgba(255,255,255,0.1)] border-solid max-md:max-w-full mx-[240px]">
      {/* Hidden file input */}
      <input 
        ref={fileInputRef} 
        type="file" 
        accept="image/*" 
        onChange={handleFileChange} 
        className="hidden" 
      />
      
      <div className="self-stretch flex min-h-[30px] flex-col justify-center w-[65px] my-auto mx-0">
        <img 
          src="https://cdn.builder.io/api/v1/image/assets/49361a2b7ce44657a799a73862a168f7/563020ade476b582398766e223b4fd3a945d4c0d?placeholderIfAbsent=true" 
          alt="Logo" 
          className="aspect-[2.53] object-contain w-[38px]" 
        />
      </div>
      
      <div className="self-stretch flex min-h-[30px] items-center gap-[15px] justify-center w-2.5 my-auto">
        <div className="bg-[rgba(43,43,43,1)] self-stretch flex min-h-[21px] w-px my-auto" />
      </div>
      
      <nav className="self-stretch min-h-[30px] gap-[15px] text-sm text-white font-normal my-auto">
        Board 1
      </nav>
      
      <div className="self-stretch flex min-h-[30px] items-center gap-[15px] justify-center w-2.5 my-auto">
        <div className="bg-[rgba(43,43,43,1)] self-stretch flex min-h-[21px] w-px my-auto" />
      </div>
      
      <div className="flex items-center gap-[15px]">
        <HeaderButton
          defaultIcon="/Property 1=Import_Default.svg"
          hoverIcon="/Property 1=Import_Hover.svg"
          clickedIcon="/Property 1=Import_Clicked.svg"
          label="Import"
          onClick={handleImport}
        />
        
        <HeaderButton
          defaultIcon="/Property 1=Export_Default.svg"
          hoverIcon="/Property 1=Export_Hover.svg"
          clickedIcon="/Property 1=Export_Clicked.svg"
          label="Export"
          onClick={handleExport}
        />
        
        <HeaderButton
          defaultIcon="/Property 1=Undo_Default.svg"
          hoverIcon="/Property 1=Undo_Hover.svg"
          clickedIcon="/Property 1=Undo_Clicked.svg"
          label="Undo"
          onClick={handleUndo}
        />
        
        <HeaderButton
          defaultIcon="/Property 1=Redo_Default.svg"
          hoverIcon="/Property 1=Redo_Hover.svg"
          clickedIcon="/Property 1=Redo_Clicked.svg"
          label="Redo"
          onClick={handleRedo}
        />
      </div>
    </header>
  );
};