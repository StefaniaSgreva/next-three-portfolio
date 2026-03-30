import Topbar from '@/components/Topbar';
import Hero3D from '@/components/Hero3D';
import ColorPalette from '@/components/ColorPalette';
import Typography from '@/components/Typography';
import ComponentsShowcase from '@/components/ComponentsShowcase';

export default function Home() {
  return (
    <div className="wrap">
      <Topbar />
      <Hero3D />
      <div className="divider-oro"></div>
      <ColorPalette />
      <div className="divider-lilla"></div>
      <Typography />
      <div className="divider-oro"></div>
      <ComponentsShowcase />
    </div>
  );
}