import Image from "next/image";
const Hero = ({ setAnalysis }: { setAnalysis: (data: boolean) => void }) => {
  return (
    <div>
      <div className="mb-5">
        <span className="border border-white rounded-lg text-white text-[40px] p-2">
          Hunter AI
        </span>
      </div>
      <div className="flex items-center justify-between">
        <div className="text-white w-3/4 space-y-12">
          <h1 className="text-[64px]">Welcome to Hunter AI</h1>
          <p className="text-2xl">
            Revolutionizing Criminal Behavior Analysis with Advanced AI
          </p>
          <p className="text-2xl">
            Uncover behavioral insights with unparalleled precision and clarity.
            Enter a biography, and let Hunter AI reveal patterns and tendencies
            that may otherwise go unnoticed.
          </p>
          <button className="border-none rounded-lg bg-[#4A90E2] px-6 py-4 text-[32px]"
          type="button"
          onClick={() =>setAnalysis(true)}
          >
            Start Your Analysis
          </button>
        </div>
        <Image
          src="/images/hunter-bg.png"
          alt="hero"
          width={600}
          height={500}
        />
      </div>
    </div>
  );
};

export default Hero;
