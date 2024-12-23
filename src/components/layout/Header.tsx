import LeftSection from './header/LeftSection';
import RightSection from './header/RightSection';

export default function Header() {
  return (
    <div className="flex items-center p-2">
      <LeftSection />
      <div className="hidden w-full md:block">
        <RightSection />
      </div>
    </div>
  );
}
