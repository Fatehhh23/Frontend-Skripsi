import { useEffect } from 'react';

interface SEOProps {
  title: string;
  description?: string;
}

const SEO: React.FC<SEOProps> = ({ title, description }) => {
  useEffect(() => {
    // Update Judul Halaman
    document.title = `${title} | AVATAR WebGIS`;

    // Update Meta Description (Opsional)
    if (description) {
      const metaDesc = document.querySelector('meta[name="description"]');
      if (metaDesc) {
        metaDesc.setAttribute('content', description);
      } else {
        const meta = document.createElement('meta');
        meta.name = 'description';
        meta.content = description;
        document.head.appendChild(meta);
      }
    }
  }, [title, description]);

  return null; // Komponen ini tidak merender UI apa pun
};

export default SEO;