import { clsx } from 'clsx';
import { WhatsappIcon } from 'react-share';

interface ShareButtonsProps {
  url: string;
  title: string;
}

const ShareButtons = ({ url }: ShareButtonsProps) => {
  const handleWhatsAppShare = () => {
    const whatsappUrl = `https://api.whatsapp.com/send?phone=18296691234&text=${encodeURIComponent(url)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className={clsx(
      'flex',
      'gap-2',
      'items-center',
      'justify-center',
      'print:hidden'
    )}>
      <button 
        onClick={handleWhatsAppShare}
        className={clsx(
          'flex',
          'items-center',
          'gap-2',
          'bg-[#25D366]',
          'text-white',
          'px-4',
          'py-2',
          'rounded-full',
          'hover:bg-[#128C7E]',
          'transition-colors'
        )}
      >
        <span className={clsx(
          'text-sm',
          'font-medium'
        )}>
          Enviar diseño
        </span>
        <WhatsappIcon size={24} round />
      </button>
    </div>
  );
};

export default ShareButtons;