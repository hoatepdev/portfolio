import "@/styles/icon-box.css";
import type { VCardIconType } from "@/types/config";

interface IconBoxProps {
  icon: VCardIconType;
}

function IconBox({ icon: Icon }: IconBoxProps) {
  return (
    <div className="icon-box bg-border-gradient-onyx text-orange-yellow-crayola shadow-shadow-1 z-1 before:bg-eerie-black-1 relative flex h-[40px] w-[40px] items-center justify-center rounded-xl text-lg before:absolute before:inset-px before:rounded-xl before:content-[''] md:h-[48px] md:w-[48px] md:text-xl">
      <Icon />
    </div>
  );
}

export default IconBox;
