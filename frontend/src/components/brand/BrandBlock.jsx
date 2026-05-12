import BrandMark from "./BrandMark";

function BrandBlock() {
  return (
    <div className="flex items-center gap-3">
      <BrandMark />
      <div>
        <p className="text-lg font-extrabold text-[#111827]">Task Manager</p>
      </div>
    </div>
  );
}

export default BrandBlock;
